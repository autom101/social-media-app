const userRouter = require("express").Router();
const User = requier("../models/user.js");

userRouter.get("/", async (request, response, next) => {
  try {
    const users = await User.findMany({});
    response.json(users);
  } catch (error) {
    next(error);
  }
});

userRouter.post();

module.exports = userRouter;
