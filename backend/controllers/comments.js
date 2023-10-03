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
    const user = request.user;
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
    post.comments = [...comments, savedComment._id.toString()];
    user.comments = [...user.comments, savedComment._id.toString()];

    await post.save();
    await user.save({
      validateModifiedOnly: true,
    }); //for whatever reason there is a bug with just .save() so it needs this additional modifier

    return response.status(201).json(savedComment);
  } catch (error) {
    next(error);
  }
});

commentRouter.post("/:subCommentId", async (request, response, next) => {
  try {
    const user = request.user;
    const { subCommentId, postId } = request.params;
    const post = await Post.findById(postId);

    if (!post) {
      return response
        .status(404)
        .json({ error: `No post with id ${postId} found` });
    }

    const parentComment = await Comment.findById(subCommentId);

    if (!parentComment) {
      return response.status(404).json({
        error: `No comment with id ${subCommentId} found on the post`,
      });
    }

    const { childComments } = parentComment;

    const newComment = new Comment({
      author: request.user,
      parentComment: parentComment._id.toString(),
      content: request.body.content,
      createdAt: new Date().getTime(),
      edited: false,
      editedAt: null,
      likes: 0,
    });

    const savedNewChildComment = await newComment.save();
    const newCommentId = savedNewChildComment._id.toString();

    parentComment.childComments = [...childComments, newCommentId];
    user.comments = [...user.comments, newCommentId];
    post.comments = [...post.comments, newCommentId];

    await post.save({
      validateModifiedOnly: true,
    });
    await parentComment.save({
      validateModifiedOnly: true,
    });
    await user.save({
      validateModifiedOnly: true,
    }); //for whatever reason there is a bug with just .save() so it needs this additional modifier

    return response.status(201).json(savedNewChildComment);
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
