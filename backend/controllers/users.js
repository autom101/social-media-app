const userRouter = require("express").Router();
const User = require("../models/user.js");
const bcrypt = require("bcrypt");

userRouter.get("/", async (request, response, next) => {
  try {
    const users = await User.findMany({});
    response.json(users);
  } catch (error) {
    next(error);
  }
});

userRouter.post("/", async (request, response, next) => {
  try {
    const { username, name, password } = request.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User(username, name, passwordHash);
    const savedUser = await newUser.save();
    response.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;
