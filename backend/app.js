const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use();

// Error handling / Unknown Endpoint

module.exports = app;
