const logger = require("./logger");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const requestHandler = (request, response, next) => {
  const { path, method, body } = request;
  logger.informationLog(`------------Begin Request Log------------`);
  logger.informationLog(`Path: ${path}`);
  logger.informationLog(`Method: ${method}`);
  logger.informationLog(`Body: `, body);
  logger.informationLog(`------------End Request Log------------`);
  next();
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  const authScheme = "Bearer ";
  let token = null;
  if (authorization && authorization.startsWith(authScheme)) {
    token = authorization.replace(authScheme, "");
  }
  request.token = token;

  next();
};

const userExtractor = async (request, response, next) => {
  const token = request.token || "";
  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (decodedToken.username) {
      const user = await User.findById(decodedToken.id);
      request.user = user;
    }
  } catch (error) {
    return response.status(401).json({ error: "Invalid token" });
  }

  next();
};

const unknownEndpoint = (error, request, response, next) => {
  return response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  logger.errorLog(error);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "Malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "Please provide a valid token" });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({ error: "Your token has expired" });
  }

  next(error);
};

module.exports = {
  requestHandler,
  tokenExtractor,
  userExtractor,
  unknownEndpoint,
  errorHandler,
};
