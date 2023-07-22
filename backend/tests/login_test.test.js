const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const User = require("../models/user");

const api = supertest(app);

beforeEach(async () => {
  //...
});

afterAll(async () => {
  await mongoose.connection.close();
});
