const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const testHelper = require("./test_helper");
const User = require("../models/user");

const api = supertest(app);

//Empty database and initialize a test user.
beforeEach(async () => {
  await testHelper.clearDatabase();
  await testHelper.createDummyUser();
});

test("check that testing_username exists in the database and is the only user", async () => {
  const result = await api
    .get("/api/users")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const users = result.body;
  expect(users).toHaveLength(1);
}, 10000);

describe("when testing the user validation of the app:", () => {
  test("attempt to create a user with no username, no name, or no password fails", async () => {
    const noUsername = {
      name: "new_user",
      password: "12345678A",
    };

    const noName = {
      username: "testing_username",
      password: "12345678A",
    };

    const noPassword = {
      name: "new_user",
      username: "testing_username",
    };

    await api.post("/api/users").send(noUsername).expect(400);
    await api.post("/api/users").send(noName).expect(400);
    await api.post("/api/users").send(noPassword).expect(400);
  });

  test("attempt to create a user with a non-unique username fails", async () => {
    const user = {
      name: "new_user",
      username: "testing_username",
      password: "12345678A",
    };

    await api.post("/api/users").send(user).expect(400);
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

  test("attempt to create a user with a good username and password succeeds", async () => {
    const goodUser = {
      name: "new_user",
      username: "username :)",
      password: "1bcdefg123",
    };

    const prevUserCount = (await User.find({})).length;

    const response = await api
      .post("/api/users")
      .send(goodUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const returnedUser = response.body;
    const users = await User.find({});
    expect(users).toHaveLength(prevUserCount + 1);
    expect(returnedUser.username).toBe("username :)");
  });
}, 20000);

afterAll(async () => {
  await mongoose.connection.close();
});
