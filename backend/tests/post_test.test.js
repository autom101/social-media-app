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

    const initialResponse = await api
      .post("/api/posts")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "My Post" })
      .expect(201);

    const postId = await initialResponse.body.id;

    const samePost = await api
      .get(`/api/posts/${postId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    const samePostId = await samePost.body.id;

    expect(postId).toEqual(samePostId);
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

  test("attempt to edit an existing post with a valid token succeeds", async () => {
    const initialTitle = "My Post";
    const changedTitle = "Not My Post";

    const loginResponse = await api
      .post("/api/login")
      .send(testHelper.dummyUserObject);

    const token = loginResponse.body.token;

    const initialResponse = await api
      .post("/api/posts")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: initialTitle })
      .expect(201);

    const post = await initialResponse.body;

    expect(post.title).toBe(initialTitle);

    const patchedResponse = await api
      .patch(`/api/posts/${post.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ title: changedTitle })
      .expect(200);

    const samePost = await patchedResponse.body;

    expect(post.id).toEqual(samePost.id);
    expect(samePost.title).toEqual(changedTitle);
  });

  test("attempt to like an existing post with a valid token succeeds", async () => {
    const title = "My Post";

    const loginResponse = await api
      .post("/api/login")
      .send(testHelper.dummyUserObject);

    const token = loginResponse.body.token;

    const initialResponse = await api
      .post("/api/posts")
      .set("Authorization", `Bearer ${token}`)
      .send({ title })
      .expect(201);

    const post = await initialResponse.body;

    const patchedResponse = await api
      .post(`/api/posts/${post.id}/like`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    const samePost = await patchedResponse.body;

    expect(post.id).toEqual(samePost.id);
    expect(post.likes + 1).toBe(samePost.likes);
  });

  test("multiple attempts to like an existing post by the same user fail after the first attempt", async () => {
    const title = "My Post";

    const loginResponse = await api
      .post("/api/login")
      .send(testHelper.dummyUserObject);

    const token = loginResponse.body.token;

    const initialResponse = await api
      .post("/api/posts")
      .set("Authorization", `Bearer ${token}`)
      .send({ title })
      .expect(201);

    const post = await initialResponse.body;

    // first like
    await api
      .post(`/api/posts/${post.id}/like`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    // second like
    await api
      .post(`/api/posts/${post.id}/like`)
      .set("Authorization", `Bearer ${token}`)
      .expect(409);

    const samePost = await api
      .get(`/api/posts/${post.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    const samePostBody = await samePost.body;

    expect(post.id).toEqual(samePostBody.id);
    expect(post.likes + 1).toBe(samePostBody.likes);
  });
}, 20000);

afterAll(async () => {
  await mongoose.connection.close();
});
