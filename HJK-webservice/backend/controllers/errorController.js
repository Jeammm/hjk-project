const AppError = require("../utils/AppError");

const handleCastErrorDB = function (err) {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDupFieldsDB = function (err) {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value: ${value}. Please use another name`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = function (err) {
  const errors = Object.values(err.errors).map((val) => val.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleJWTError = function () {
  const message = "Invalid token. Please log in again.";
  return new AppError(message, 401);
};

const handleJWTExpire = function () {
  const message = "Your session is Expired. Please log in again.";
  return new AppError(message, 401);
};

const sendProdError = function (err, res) {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error("Error💥 :", err);

    res.status(500).json({
      status: "Error",
      message: "Something went very wrong",
    });
  }
};

const sendDevError = function (err, res) {
  res.status(err.statusCode).json({
    status: err.status,
    err: err,
    message: err.message,
    stack: err.stack,
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  console.log(err.name)

  if (process.env.NODE_ENV === "development") {
    sendDevError(err, res);
  } else if (process.env.NODE_ENV.trim() === "production") {
    let error = new AppError(err.message || "error", err.statusCode);

    if (err.name === "CastError") error = handleCastErrorDB(err);
    if (err.code === 11000) error = handleDupFieldsDB(err);
    if (err.name === "ValidationError") error = handleValidationErrorDB(err);
    if (err.name === "JsonWebTokenError") error = handleJWTError();
    if (err.name === "TokenExpiredError") error = handleJWTExpire();
    sendProdError(error, res);
  }
};
