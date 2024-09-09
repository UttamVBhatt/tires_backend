const AppError = require("../utils/AppError");

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    err,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.log("Something went wrong into production");
    console.log(err.stack, err.message, err);

    res.status(500).json({
      status: "FAIL",
      message: "Something went wrong, please try again later",
    });
  }
};

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path} : ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.KeyValue.name;
  const message = `This value ${value} is a duplicate value, please use another value`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const value = Object.values(err.errors).map((el) => el.message);
  const message = `This value ${value} is an invalid value, please use another value`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError(`Invalid token, please login to get a new token`, 401);

const handleTokenExpiredError = () =>
  new AppError(
    "Your token has been expired, please login to get a new token",
    401
  );

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "ERROR";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else {
    const error = { ...err };
    if (err.message) error.message = error.message;
    if (err.name === "CastError") error = handleCastErrorDB(err);
    if (err.code === 11000) error = handleDuplicateFieldsDB(err);
    if (err.name === "ValidationError") error = handleValidationErrorDB(err);
    if (err.name === "JsonWebTokenError") error = handleJWTError();
    if (err.name === "TokenExpiredError") error = handleTokenExpiredError();
    sendErrorProd(error, res);
  }
};
