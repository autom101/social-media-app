const informationLog = (...information) => {
  console.log(...information);
};

const errorLog = (...information) => {
  console.error(...information);
};

module.exports = { informationLog, errorLog };
