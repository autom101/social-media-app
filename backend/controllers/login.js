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

    // If a user cannot be found, or the password is incorrect then we send a 401 back
    if (user === null || !passwordCorrect) {
      return response.status(401).json({
        error: "Invalid username or password",
      });
    }

    // Since user exists and password is correct, send a token that expires in 24 hrs from time of issue
    const issueDate = Math.floor(Date.now() / 1000);

    const tokenUser = {
      id: user._id,
      name: user.name,
      username: username,
      iat: issueDate,
    };

    const accessToken = jwt.sign(tokenUser, config.ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign(tokenUser, config.REFRESH_TOKEN_SECRET, {
      expiresIn: "30d",
    });

    // save the refresh token as a cookie
    response.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "prod",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return response.status(201).json({
      token: accessToken,
      id: user._id,
      name: user.name,
      username,
      issuedAt: issueDate,
    });
  } catch (error) {
    next(error);
  }
});

loginRouter.post("/refresh", async (request, response, next) => {
  try {
    const { refreshToken } = request.cookies;

    if (!refreshToken) {
      return response
        .status(401)
        .json({ error: "Please provide a refresh token" });
    }

    // refresh token using jwt (move to middleware later)
    const decodedToken = await jwt.verify(
      refreshToken,
      config.REFRESH_TOKEN_SECRET
    );

    if (!decodedToken) {
      return response.status(403).json({ error: "Invalid refresh token" });
    }

    const user = { ...decodedToken };
    const issueDate = Math.floor(Date.now() / 1000);

    const tokenUser = {
      id: user.id,
      name: user.name,
      username: user.username,
      iat: issueDate,
    };

    const accessToken = jwt.sign(tokenUser, config.ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });

    return response.status(201).json({
      token: accessToken,
      id: tokenUser.id,
      name: tokenUser.name,
      username: tokenUser.username,
      issuedAt: issueDate,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = loginRouter;
