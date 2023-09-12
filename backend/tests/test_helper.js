const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");
const bcrypt = require("bcrypt");

const dummyUserObject = {
  name: "testing_user",
  username: "testing_username",
  password: "Password123!",
};

const clearDatabase = async () => {
  await User.deleteMany({});
  await Post.deleteMany({});
  await Comment.deleteMany({});
};

const createDummyUser = async () => {
  const { name, username, password } = dummyUserObject;
  const passwordHash = await bcrypt.hash(password, 10);
  const user = new User({ name, username, passwordHash });
  return user.save();
};

const createDummyPost = async (api, token, postObj) => {
  const response = await api
    .post("/api/posts")
    .set("Authorization", "Bearer " + token)
    .send(postObj);
  return response.body;
};

module.exports = {
  dummyUserObject,
  clearDatabase,
  createDummyUser,
  createDummyPost,
};
