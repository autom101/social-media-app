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

beforeEach(async () => {
  await testHelper.clearDatabase();
  await testHelper.createDummyUser();
  dummyUser = testHelper.dummyUserObject;
  const tokenObj = (await api.post("/api/login").send(dummyUser)).body;
  dummyPost = await testHelper.createDummyPost(api, tokenObj.token, {
    title: "My post title",
  });
  console.log(dummyPost);
});

describe("When a user, testing_user, is logged in", () => {
  test("a user can make a comment on a post", async () => {
    //
    await api.get(`/api/posts/${dummyPost.id}`).expect(200);
  });
}, 20000);

afterAll(async () => {
  await mongoose.connection.close();
});
