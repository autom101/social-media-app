const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const User = require("../models/user");

const api = supertest(app);

beforeEach(async () => {
  //Have to empty db and create a user before running any tests.
  await User.deleteMany({});
  const passwordHash = await bcrypt.hash("12345", 10);
  const newUser = new User({
    username: "user_test",
    name: "test user",
    passwordHash,
  });
  await newUser.save();
});

describe("When logging in with one user in the database", () => {
  test("user will receive 401 if an incorrect password is provided", async () => {
    const user = {
      username: "user_test",
      password: "incorrect password",
    };

    await api.post("/api/login").send(user).expect(401);
  });

  test("user can successfully login with correct password and username", async () => {
    const user = {
      username: "user_test",
      password: "12345",
    };

    const receivedData = await api.post("/api/login").send(user).expect(201);

    expect(receivedData.body.token).toBeDefined();
  });
}, 20000);

afterAll(async () => {
  await mongoose.connection.close();
});
