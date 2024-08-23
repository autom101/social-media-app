require("dotenv").config();

const PORT = process.env.PORT || 3003;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;
const ORIGIN = process.env.ORIGIN;

module.exports = {
  PORT,
  REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_SECRET,
  MONGODB_URI,
  ORIGIN,
};
