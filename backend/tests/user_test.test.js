const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const User = require("../models/user");

const api = supertest(app);

//Empty database and initialize a test user.
beforeEach(async () => {
  await User.deleteMany({});
  const passwordHash = await bcrypt.hash("Password123!", 10);
  const user = new User({
    name: "testing_user",
    username: "testing_username",
    passwordHash,
  });

  await user.save();
});

test("check that testing_username exists in the database and is the only user", async () => {
  const result = await api
    .get("/api/users")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const users = result.body;
  expect(users).toHaveLength(1);
}, 10000);

describe("with one user, testing_username, in the database", () => {
  test("attempt to create a user with a non-unique username fails", async () => {
    const user = {
      name: "new_user",
      username: "testing_username",
      password: "12345678A",
    };

    const response = await api.post("/api/users").send(user).expect(400);
  });

  test("attempt to create a user with a bad password fails", async () => {
    const notEightChars = {
      name: "new_user",
      username: "username :)",
      password: "1bcdefg",
    };

    const missingNumber = {
      name: "new_user",
      username: "username :)",
      password: "Abcdefgasdf",
    };

    const missingLetter = {
      name: "new_user",
      username: "username :)",
      password: "123456789",
    };

    await api.post("/api/users").send(notEightChars).expect(400);
    await api.post("/api/users").send(missingNumber).expect(400);
    await api.post("/api/users").send(missingLetter).expect(400);
  });
}, 20000);

afterAll(async () => {
  await mongoose.connection.close();
});
