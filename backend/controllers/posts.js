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

module.exports = postRouter;
