const logger = require("./logger");

const requestHandler = (request, response, next) => {
  logger.informationLog("Path: ", request.path);
  logger.informationLog("Method: ", request.method);
  logger.informationLog("Body: ", request.body);
  next();
};

const errorHandler = (error, request, response, next) => {
  logger.errorLog(error);
  next(error);
};

module.exports = { requestHandler, errorHandler };
