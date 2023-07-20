const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./utils/config");

//Import express middleware
const logger = require("./utils/logger");

const app = express();

//Connect to mongoose
const url = config.MONGODB_URI;
mongoose.set("strictQuery", false);
logger.informationLog(`Connecting to mongoose`);
mongoose.connect(url);

// Basic Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use();

// Error handling / Unknown Endpoint middleware

module.exports = app;
