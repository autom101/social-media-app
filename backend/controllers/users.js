const userRouter = require("express").Router();
const User = require("../models/user.js");
const bcrypt = require("bcrypt");

userRouter.get("/", async (request, response, next) => {
  try {
    const users = await User.find({});
    response.json(users);
  } catch (error) {
    next(error);
  }
});

userRouter.get("/:id/posts", async (request, response, next) => {
  try {
    const { posts } = await User.findById(request.params.id).populate("posts");
    return response.json(posts);
  } catch (error) {
    next(error);
  }
});

userRouter.get("/:id/savedPosts", async (request, response, next) => {
  try {
    const { savedPosts } = await User.findById(request.params.id).populate(
      "savedPosts"
    );
    return response.json(savedPosts);
  } catch (error) {
    next(error);
  }
});

userRouter.post("/", async (request, response, next) => {
  try {
    const { username, name, password } = request.body;

    if (!password) {
      return response
        .status(400)
        .json({ error: "A password must be provided" });
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g;

    if (!password.match(passwordRegex)) {
      return response.status(400).json({
        error:
          "Password must contains at least 1 number, 1 letter, and be at least 8 characters long",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({ username, name, passwordHash });
    const savedUser = await newUser.save();

    response.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;
