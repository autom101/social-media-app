const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const loginRouter = require("express").Router();

const User = require("../models/user");
const config = require("../utils/config");

loginRouter.post("/", async (request, response, next) => {
  try {
    const { username, password } = request.body;
    const user = await User.findOne({ username });

    let passwordCorrect = false;

    if (user) {
      passwordCorrect = await bcrypt.compare(password, user.passwordHash);
    }

    //If a user cannot be found, or the password is incorrect then we send a 401 back
    if (user === null || !passwordCorrect) {
      return response.status(401).json({
        error: "Invalid username or password",
      });
    }

    const tokenUser = {
      name: user.name,
      username: username,
    };

    //Since user exists and password is correct, send a token that expires in 24 hrs from time of issue
    const token = jwt.sign(tokenUser, config.SECRET_STRING, {
      expiresIn: "24h",
    });

    return response.json({
      token,
      name: user.name,
      username,
      issuedAt: Date.now(),
    });
  } catch (error) {
    next(error);
  }
});

loginRouter.post("/refresh", async (request, response, next) => {
  //
});

module.exports = loginRouter;
