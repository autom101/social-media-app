const logger = require("./logger");

const requestHandler = (request, response, next) => {
  const { path, method, body } = request;
  logger.informationLog(`------------Begin Request Log------------`);
  logger.informationLog(`Path: ${path}`);
  logger.informationLog(`Method: ${method}`);
  logger.informationLog(`Body: `, body);
  logger.informationLog(`------------End Request Log------------`);
  next();
};

const errorHandler = (error, request, response, next) => {
  logger.errorLog(error);
  if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};

const unknownEndpoint = (error, request, response, next) => {
  return response.status(404).send({ error: "unknown endpoint" });
};

module.exports = { requestHandler, errorHandler, unknownEndpoint };
