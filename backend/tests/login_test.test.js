const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const User = require("../models/user");
const test_helper = require("./test_helper");

const api = supertest(app);

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

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

  test("user can successfully refresh their token with a valid refresh token", async () => {
    const loginResponse = await api
      .post("/api/login")
      .send(test_helper.dummyUserObject)
      .expect(201);

    const loginBody = await loginResponse.body;

    expect(loginBody.token).toBeDefined();

    // Extract the refresh token from the response cookies
    const cookie = loginResponse.headers["set-cookie"].find((cookie) =>
      cookie.startsWith("refreshToken=")
    );

    // this is required for the tokens to be different, otherwise jwt issues the same token
    await sleep(1000);

    expect(cookie).toBeDefined();

    const refreshToken = cookie
      .split(";")[0] // only take the refreshToken = part
      .split("=")[1]; // get rid of the "refreshToken=" string

    expect(refreshToken).toBeDefined();

    // Use the refresh token to get a new access token
    const refreshResponse = await api
      .post("/api/login/refresh")
      .set("Cookie", [`refreshToken=${refreshToken}`])
      .expect(201);

    const refreshBody = await refreshResponse.body;

    expect(refreshBody.token).toBeDefined();
    // Make sure we get a different access token
    expect(refreshBody.token).not.toEqual(loginBody.token);
    // Validate that the standard properties of the new access token are the same as that of the previous token
    expect(refreshBody.id).toBe(loginBody.id);
    expect(refreshBody.name).toBe(loginBody.name);
    expect(refreshBody.username).toBe(loginBody.username);

    expect(refreshBody.issuedAt).toBeDefined();
  });
}, 20000);

afterAll(async () => {
  await mongoose.connection.close();
});
