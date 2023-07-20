const logger = require("./logger");

const errorHandler = (error, request, response, next) => {
  logger.errorLog(error);
  next(error);
};

module.exports = { errorHandler };
