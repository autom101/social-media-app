const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./utils/config");

const logger = require("./utils/logger");
//Import middleware
const middleware = require("./utils/middleware");
const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const postRouter = require("./controllers/posts");
const postCommentRouter = require("./controllers/postComments");

const app = express();

//Connect to mongoose
const url = config.MONGODB_URI;
mongoose.set("strictQuery", false);
logger.informationLog(`Connecting to mongoose on: `, url);
mongoose.connect(url);

// Basic Middleware
app.use(cors());
app.use(express.json());
app.use(middleware.requestHandler);

// Routes
app.use("/api/login", loginRouter);
app.use(middleware.tokenExtractor);
app.use("/api/users", userRouter);
app.use("/api/posts", middleware.userExtractor, postRouter);
app.use("/api/posts/:postId/postComments", postCommentRouter);

// Error handling / Unknown Endpoint middleware
app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);

module.exports = app;
