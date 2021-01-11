const {
  BadRequestException,
  UnauthorizedException,
  InternalServerErrorException,
} = require("./exception-code");

module.exports = errorHandler;

function errorHandler(err, req, res, next) {
  if (typeof err === "string") {
    // custom application error
    return res.status(BadRequestException).json({ message: err });
  }

  if (err.name === "ValidationError") {
    // mongoose validation error
    return res.status(BadRequestException).json({ message: err.message });
  }

  if (err.name === "UnauthorizedError") {
    // jwt authentication error
    return res.status(UnauthorizedException).json({ message: "Invalid Token" });
  }

  // default to 500 server error
  return res
    .status(InternalServerErrorException)
    .json({ message: err.message });
}
