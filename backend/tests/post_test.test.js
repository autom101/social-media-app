const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const testHelper = require("./test_helper");

const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");

const api = supertest(app);

beforeEach(async () => {
  await testHelper.clearDatabase();
  await testHelper.createDummyUser();
});

describe("", () => {
  test("attempt to get posts without being logged in fails", async () => {
    await api.get("/api/posts").expect(401);
  });

  test("attempt to get posts with a token provided succeeds", async () => {
    const loginResponse = await api
      .post("/api/login")
      .send(testHelper.dummyUserObject);

    const token = loginResponse.body.token;

    await api
      .get("/api/posts")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });
}, 20000);

afterAll(async () => {
  await mongoose.connection.close();
});
