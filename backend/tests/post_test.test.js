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
}, 10000);

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

  test("attempt to get a specific post with a token provided succeeds", async () => {
    const loginResponse = await api
      .post("/api/login")
      .send(testHelper.dummyUserObject);

    const token = loginResponse.body.token;

    const post = await api
      .post("/api/posts")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "My Post" })
      .expect(201);

    const samePost = await api
      .get(`/api/posts/${post.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(post.id).toEqual(samePost.id);
  });

  test("attempt to create a post with a valid token succeeds", async () => {
    const loginResponse = await api
      .post("/api/login")
      .send(testHelper.dummyUserObject);

    const token = loginResponse.body.token;

    const post = await api
      .post("/api/posts")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "My Post" })
      .expect(201);

    expect(post.body).toBeDefined();
    expect(post.body.title).toBe("My Post");
  });
}, 20000);

afterAll(async () => {
  await mongoose.connection.close();
});
