require("dotenv").config();

const PORT = process.env.PORT || 3003;
const SECRET_STRING = process.env.SECRET;
const MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

module.exports = { PORT, SECRET_STRING, MONGODB_URI };
