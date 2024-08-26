const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");

const config = require("./utils/config");

const logger = require("./utils/logger");
//Import middleware
const middleware = require("./utils/middleware");
const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const postRouter = require("./controllers/posts");
const commentRouter = require("./controllers/comments");

const app = express();

//Connect to mongoose
const url = config.MONGODB_URI;
mongoose.set("strictQuery", false);
logger.informationLog(`Connecting to mongoose on: `, url);
mongoose.connect(url);

// Basic Middleware
app.use(
  cors({
    origin: config.ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use(
  rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    limit: 100, // Set a limit of 100 IP requests per 10 minutes
    message: "Your limit for the past 10 minutes has been reached",
    standardHeaders: "draft-7",
    legacyHeaders: false,
  })
);
app.use(middleware.requestHandler);

// Routes
app.use("/api/login", loginRouter);
app.use(middleware.tokenExtractor);
app.use("/api/users", userRouter);
app.use(middleware.userExtractor);
app.use("/api/posts/:postId/comments", commentRouter);
app.use("/api/posts", postRouter);
// Error handling / Unknown Endpoint middleware
app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);

module.exports = app;
