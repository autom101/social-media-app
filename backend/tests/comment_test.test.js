const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const testHelper = require("./test_helper");

const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");

const api = supertest(app);

let dummyUser = {};
let dummyPost = {};

/* 
      title: request.title,
      author: user,
      createdAt: new Date().getTime(),
      comments: [],
      likes: 0,
      likedBy: [],
      edited: false,
      editedAt: null,
*/
let tokenObj = "";
beforeEach(async () => {
  await testHelper.clearDatabase();
  await testHelper.createDummyUser();
  dummyUser = testHelper.dummyUserObject;
  tokenObj = (await api.post("/api/login").send(dummyUser)).body;
  dummyPost = await testHelper.createDummyPost(api, tokenObj.token, {
    title: "My post title",
  });
}, 20000);

describe("When a user, testing_user, is logged in", () => {
  test("a user can get a comment on a post", async () => {
    //Make sure that the post is defined first
    const post = await api
      .get("/api/posts")
      .set("Authorization", `Bearer ${tokenObj.token}`)
      .expect(200);

    const postBody = post.body[0];
    expect(postBody).toBeDefined();

    const response = await api
      .get(`/api/posts/${postBody.id}/comments`)
      .set("Authorization", `Bearer ${tokenObj.token}`)
      .expect(200);

    const body = response.body;
    expect(body).toBeDefined();
  });

  test("a user can post a comment on an existing post", async () => {
    const post = await api
      .get("/api/posts")
      .set("Authorization", `Bearer ${tokenObj.token}`)
      .expect(200);

    const postBody = post.body[0];
    expect(postBody).toBeDefined();

    const content = "Testing comment on post";

    const response = await api
      .post(`/api/posts/${postBody.id}/comments`)
      .set("Authorization", `Bearer ${tokenObj.token}`)
      .send({ content })
      .expect(201);

    const body = response.body;
    expect(body).toBeDefined();
    expect(body.content).toBe(content);
  });

  test("a user can post a comment on an existing comment", async () => {
    const post = await api
      .get("/api/posts")
      .set("Authorization", `Bearer ${tokenObj.token}`)
      .expect(200);

    const postBody = post.body[0];
    expect(postBody).toBeDefined();

    const parentContent = "Testing comment on post";
    const childContent = "Comment on comment";

    const parentComment = await api
      .post(`/api/posts/${postBody.id}/comments`)
      .set("Authorization", `Bearer ${tokenObj.token}`)
      .send({ content: parentContent })
      .expect(201);

    const parent = parentComment.body;

    const childComment = await api
      .post(`/api/posts/${postBody.id}/comments/${parent.id}`)
      .set("Authorization", `Bearer ${tokenObj.token}`)
      .send({ content: childContent })
      .expect(201);

    const parentAfterChild = await Comment.findById(parent.id).populate(
      "childComments"
    );

    const child = childComment.body;

    expect(parent).toBeDefined();
    expect(child).toBeDefined();
    expect(parent.content).toBe(parentContent);
    expect(child.content).toBe(childContent);
    expect(parentAfterChild.childComments[0].content).toBe(childContent);
  });
}, 20000);

afterAll(async () => {
  await mongoose.connection.close();
});
