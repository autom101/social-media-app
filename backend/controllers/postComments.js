const postCommentRouter = require("express").Router();
const Comment = require("../models/comment");
const Post = require("../models/post");

postCommentRouter.get("/", async (request, response, next) => {
  try {
    const id = request.params.postId;
    const post = await Post.findById(id).populate("comments");
    const { comments } = post;

    return response.json(comments);
  } catch (error) {
    next(error);
  }
});

module.exports = postCommentRouter;
