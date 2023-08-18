const informationLog = (...information) => {
  if (process.env.NODE_ENV !== "test") {
    console.log(...information);
  }
};

const errorLog = (...information) => {
  if (process.env.NODE_ENV !== "test") {
    console.error(...information);
  }
};

module.exports = { informationLog, errorLog };
