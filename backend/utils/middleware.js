const logger = require("./logger");

const requestHandler = (request, response, next) => {
  logger.informationLog(`------------Begin Request Log------------`);
  logger.informationLog(`Path: ${request.path}`);
  logger.informationLog(`Method: ${request.method}`);
  logger.informationLog(`Body: ${request.body}`);
  logger.informationLog(`------------End Request Log------------`);
  next();
};

const errorHandler = (error, request, response, next) => {
  logger.errorLog(error);
  next(error);
};

const unknownEndpoint = (error, request, response, next) => {
  response.status(404).send({ error: "unknown endpoint" });
};

module.exports = { requestHandler, errorHandler, unknownEndpoint };
