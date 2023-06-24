const { promisify } = require("util");
// const crypto = require("crypto");
const User = require("../services/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

const signToken = async (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createAndSendToken = async (user, status, res) => {
  const token = await signToken(user.UserID);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    cookieOptions.secure = true
    cookieOptions.sameSite = "None"
  }

  res.cookie("jwt", token, cookieOptions);

  //remove password from output
  user.password = undefined;

  res.status(201).json({
    status: "success",
    token: token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  //1) check if email & password exist
  if (!req.body.username || !req.body.password || !req.body.passwordConfirm) {
    return next(new AppError("Please provide email and password", 400));
  }

  //2) check if password confirm is correct
  if (req.body.password !== req.body.passwordConfirm) {
    next(new AppError("Password not matched", 400));
  }

  const username = req.body.username;
  const password = await bcrypt.hash(req.body.password, 12);

  const newUser = {
    username: username,
    password: password,
  };

  const genID = User.create(newUser);
  if (!genID) {
    next(new AppError("There was an error creating account", 400));
  }
  newUser.UserID = genID;

  createAndSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  //1) check if username & password exist
  if (!username || !password) {
    next(new AppError("Please provide username and password", 400));
  }

  //2) check if user exists & password correct
  const user = await User.getUserCredential(username);

  if (!user || !(await User.correctPassword(password, user.password))) {
    return next(new AppError("Incorret username or password", 401));
  }

  //3) send back a token
  createAndSendToken(user, 201, res);
});

exports.logout = catchAsync(async (req, res, next) => {
  const cookieOptions = {
    expires: new Date(
      Date.now()
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    cookieOptions.secure = true;
    cookieOptions.sameSite = "None"
  }

  res.cookie("jwt", "", cookieOptions);
  res.status(201).json({
    status: "success",
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  //1) check if token is provided
  let token;
  if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(new AppError("You are not logged in!", 401));
  }

  //2) verify token

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //3) check if user still exists
  const freshUser = await User.getUserById(decoded.id);
  if (!freshUser) {
    // return next(new AppError("User not found", 401));
    return next(new AppError("User not found", 401));
  }

  //4) check if user change password after token issued
  // if (freshUser.changePasswordAfter(decoded.iat)) {
  //   return next(new AppError("User recently changed password!", 401));
  // }

  req.user = freshUser;
  next();
});

exports.isAuthorized = catchAsync(async (req, res, next) => {
  //1) check if token is provided
  let token;
  if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(new AppError("You are not logged in!", 401));
  }

  //2) verify token

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //3) check if user still exists
  const freshUser = await User.getUserById(decoded.id);
  if (!freshUser) {
    // return next(new AppError("User not found", 401));
    return next(new AppError("User not found", 401));
  }

  freshUser.password = null;

  res.status(201).json({
    status: "success",
    freshUser,
  });
});
