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
        error:
          "Username and password provided do not correspond to any user in the database",
      });
    }

    const tokenUser = {
      name: user.name,
      username: username,
    };
    //Since user exists and password is correct, send a token that expires in 24 hrs from time of issue
    const token = jwt.sign(tokenUser, config.SECRET_STRING, {
      expiresIn: 86400,
    });

    return response
      .status(201)
      .send({ token, name: user.name, username, issuedAt: Date.now() });
  } catch (error) {
    next(error);
  }
});

module.exports = loginRouter;
