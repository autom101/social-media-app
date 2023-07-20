const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./utils/config");

const logger = require("./utils/logger");
//Import express middleware
const middleware = require("./utils/middleware");

const app = express();

//Connect to mongoose
const url = config.MONGODB_URI;
mongoose.set("strictQuery", false);
logger.informationLog(`Connecting to mongoose`);
mongoose.connect(url);

// Basic Middleware
app.use(cors());
app.use(express.json());
app.use(middleware.requestHandler);

// Routes
app.use();

// Error handling / Unknown Endpoint middleware
app.use(middleware.errorHandler);

module.exports = app;
