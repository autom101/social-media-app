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

postRouter.patch("/:id/like", async (request, response, next) => {
  try {
    const { id } = request.params;
    const body = request.body;

    if (!id) {
      return response
        .status(400)
        .json({ message: "Please provide a valid id" });
    }

    const exists = await Post.findById(id);

    if (!exists) {
      return response.status(404);
    }

    const newLikes = exists.likes + 1;

    const post = await Post.findByIdAndUpdate(
      id,
      { likes: newLikes },
      {
        runValidators: true,
        new: true,
      }
    );

    return response.json(post);
  } catch (error) {
    next(error);
  }
});

postRouter.patch("/:id", async (request, response, next) => {
  try {
    const { id } = request.params;
    const body = request.body;

    if (!id) {
      return response
        .status(400)
        .json({ message: "Please provide a valid id" });
    }

    if (!body) {
      return response
        .status(400)
        .json({ message: "Please provide a valid change" });
    }

    const exists = await Post.findById(id);

    if (!exists) {
      return response.status(404);
    }

    const post = await Post.findByIdAndUpdate(id, body, {
      runValidators: true,
      new: true,
    });

    return response.json(post);
  } catch (error) {
    next(error);
  }
});

module.exports = postRouter;
