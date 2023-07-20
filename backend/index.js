const app = require("app");
const mongoose = require("mongoose");
const PORT = require("./utils/config");

app.listen(PORT, () => {
  console.log("Server is active on Port " + PORT);
});
