const commentRouter = require("express").Router({ mergeParams: true });
const Comment = require("../models/comment");
const Post = require("../models/post");

commentRouter.get("/", async (request, response, next) => {
  try {
    const { postId } = request.params;

    const post = await Post.findById(postId);

    if (!post) {
      return response
        .status(404)
        .json({ error: `No post with id ${postId} found` });
    }

    await post.populate({
      path: "comments",
      populate: {
        path: "childComments",
      },
    });

    return response.json(post.comments);
  } catch (error) {
    next(error);
  }
});

//Extract comments array from post, then create a new comment and add it to the comment collection. Then, add the saved comment to post's comments Array and save that in the post collection.

commentRouter.post("/", async (request, response, next) => {
  try {
    const id = request.params.postId;
    const post = await Post.findById(id).populate("comments");
    const { comments } = post;

    const newComment = new Comment({
      author: request.user,
      parentComment: null,
      content: request.body.content,
      createdAt: new Date().getTime(),
      edited: false,
      editedAt: null,
      likes: 0,
    });

    const savedComment = await newComment.save();

    post.comments = [...comments, savedComment];
    const savedPost = await post.save();

    return response.status(201).json(savedComment);
  } catch (error) {
    next(error);
  }
});

commentRouter.post("/:subCommentId", async (request, response, next) => {
  try {
    const id = request.params.subCommentId;
    const parentComment = await Comment.findById(id).populate("childComments");
    const { childComments } = parentComment;

    const newComment = new Comment({
      author: request.user,
      parentComment: parentComment,
      content: request.body.content,
      createdAt: new Date().getTime(),
      edited: false,
      editedAt: null,
      likes: 0,
    });

    const savedNewChildComment = await newComment.save();

    parentComment.childComments = [...childComments, savedNewChildComment];
    const savedParentComment = await parentComment.save();

    return response.status(201).json(savedParentComment);
  } catch (error) {
    next(error);
  }
});

commentRouter.put("/:commentId", async (request, response, next) => {
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

module.exports = commentRouter;
