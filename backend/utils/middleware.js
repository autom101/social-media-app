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

const tokenExtractor = (request) => {
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
  if (request.token) {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (decodedToken.username) {
      const user = await User.findOne({ username: decodedToken.username });
      request.user = user;
    } else {
      return response.status(401).json({ error: "invalid token" });
    }
  }
  next();
};

const unknownEndpoint = (error, request, response, next) => {
  return response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  logger.errorLog(error);
  if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
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
