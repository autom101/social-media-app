const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const User = require("../models/user");
const test_helper = require("./test_helper");

const api = supertest(app);

beforeEach(async () => {
  //Have to empty db and create a user before running any tests.
  await test_helper.clearDatabase();
  await test_helper.createDummyUser();
});

describe("when logging in with one user in the database", () => {
  test("user will receive 401 if an incorrect password is provided", async () => {
    const user = {
      username: "user_test",
      password: "incorrect password",
    };

    await api.post("/api/login").send(user).expect(401);
  });

  test("user can successfully login with correct password and username", async () => {
    const receivedData = await api
      .post("/api/login")
      .send(test_helper.dummyUserObject)
      .expect(201);

    expect(receivedData.body.token).toBeDefined();
  });
}, 20000);

afterAll(async () => {
  await mongoose.connection.close();
});
