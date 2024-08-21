const postRouter = require("express").Router();
const Post = require("../models/post");

postRouter.get("/:id", async (request, response, next) => {
  try {
    const { id } = request.params;

    if (!id) {
      return response
        .status(400)
        .json({ message: "Please provide a valid id" });
    }

    const post = await Post.findById(id);

    if (!post) {
      return response.status(404);
    }

    return response.json(post);
  } catch (error) {
    next(error);
  }
});

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
