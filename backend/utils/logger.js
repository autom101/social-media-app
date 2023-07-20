const requestLogger = (request, response, next) => {
  console.log(...request);
  next();
};

module.exports = requestLogger;
