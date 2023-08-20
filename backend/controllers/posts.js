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
      title: request.title,
      author: user,
      createdAt: new Date().getTime(),
      comments: [],
      likes: 0,
      likedBy: [],
      edited: false,
      editedAt: null,
    });

    const savedPost = await newPost.save();

    return response.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
});

module.exports = postRouter;
