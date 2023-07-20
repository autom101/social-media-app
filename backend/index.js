const app = require("./app");
const config = require("./utils/config");

const PORT = config.PORT;

app.listen(PORT, () => {
  console.log("Server is active on Port " + PORT);
});
