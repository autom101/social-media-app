const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");
const bcrypt = require("bcrypt");

const clearDatabase = async () => {
  await User.deleteMany({});
  await Post.deleteMany({});
  await Comment.deleteMany({});
};

const createDummyUser = async () => {
  const passwordHash = await bcrypt.hash("Password123!", 10);
  const user = new User({
    name: "testing_user",
    username: "testing_username",
    passwordHash,
  });
  return user.save();
};

module.exports = { clearDatabase, createDummyUser };
