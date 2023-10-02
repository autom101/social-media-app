const postRouter = require("express").Router();
const Post = require("../models/post");

postRouter.get("/", async (request, response, next) => {
  try {
    const posts = await Post.find({});
    return response.json(posts);
  } catch (error) {
    next(error);
  }
});

postRouter.post("/", async (request, response, next) => {
  try {
    const user = request.user;

    const newPost = new Post({
      title: request.body.title,
      author: user._id,
      createdAt: new Date().getTime(),
      comments: [],
      likes: 0,
      likedBy: [],
      edited: false,
      editedAt: null,
    });

    const savedPost = await newPost.save();

    user.posts = [...user.posts, savedPost._id.toString()];
    const returnedUser = await user.save();

    return response.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
});

module.exports = postRouter;
