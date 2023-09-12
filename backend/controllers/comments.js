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

//Extract comments array from post, then create a new comment and add it to the comment collection. Then, add the saved comment to post's comments Array and save that in the post collection.

postCommentRouter.post("/", async (request, response, next) => {
  try {
    const id = request.params.postId;
    const post = await Post.findById(id).populate("comments");
    const { comments } = post;

    const newComment = new Comment({
      content: request.content,
      createdAt: new Date().getTime(),
      author: request.user,
      edited: false,
      editedAt: null,
      likes: 0,
    });

    const savedComment = await newComment.save();

    post.comments = { ...comments, savedComment };
    const savedPost = await post.save();

    return response.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
});

postCommentRouter.post("/:subCommentId", async (request, response, next) => {
  try {
    const id = request.params.subCommentId;
    const parentComment = await Comment.findById(id).populate("childComments");
    const { childComments } = parentComment;

    const newComment = new Comment({
      content: request.content,
      createdAt: new Date().getTime(),
      author: request.user,
      edited: false,
      editedAt: null,
      likes: 0,
    });

    const savedNewChildComment = await newComment.save();

    parentComment.comments = {
      ...childComments,
      savedNewChildComment,
    };
    const savedParentComment = await parentComment.save();

    return response.status(201).json(savedParentComment);
  } catch (error) {
    next(error);
  }
});

postCommentRouter.put("/:commentId", async (request, response, next) => {
  try {
    const commentId = request.params.commentId;
    const updateInformation = request.body;

    const newComment = await Comment.findByIdAndUpdate(
      commentId,
      updateInformation,
      {
        new: true,
        runValidators: true,
        context: "query",
      }
    );

    return response.status(201).json(newComment);
  } catch (error) {
    next(error);
  }
});

module.exports = postCommentRouter;
