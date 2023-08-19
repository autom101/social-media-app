const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const User = require("../models/user");
const Post = require("../models/post");

const api = supertest(app);

beforeEach(async () => {
  //...
});

describe();

afterAll(async () => {
  await mongoose.connection.close();
});
