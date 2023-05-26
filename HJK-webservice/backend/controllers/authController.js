const { promisify } = require("util");
// const crypto = require("crypto");
const User = require("../services/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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
    cookieOptions.secure = true;
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

exports.signup = async (req, res, next) => {
  if (req.body.password !== req.body.passwordConfirm) {
    next(new Error("Password not matched"));
  }
  const username = req.body.username;
  const password = await bcrypt.hash(req.body.password, 12);

  const newUser = {
    username: username,
    password: password,
  };

  try {
    const genID = User.create(newUser);
    newUser.UserID = genID;
  } catch (err) {
    next(err);
  }

  createAndSendToken(newUser, 201, res);
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  //1) check if username & password exist
  if (!username || !password) {
    next(new Error("Please provide username and password"));
  }

  //2) check if user exists & password correct
  const user = await User.getUserCredential(username);

  if (!user || !(await User.correctPassword(password, user.password))) {
    return next(new Error("Incorret username or password"));
  }

  //3) send back a token
  createAndSendToken(user, 201, res);
};

exports.protect = async (req, res, next) => {
  //1) check if token is provided
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(Error("You are not logged in!"));
  }

  //2) verify token

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //3) check if user still exists
  const freshUser = await User.getUserById(decoded.id);
  if (!freshUser) {
    // return next(new AppError("User not found", 401));
    return next(new Error("User not found"));
  }

  //4) check if user change password after token issued
  // if (freshUser.changePasswordAfter(decoded.iat)) {
  //   return next(new AppError("User recently changed password!", 401));
  // }
  
  req.user = freshUser;
  next();
};

// exports.restrictTo =
//   (...roles) =>
//   (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return next(
//         new AppError('You do not have permission to perform this action.', 403)
//       );
//     }
//     next();
//   };
