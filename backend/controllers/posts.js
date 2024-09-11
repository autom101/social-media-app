const postRouter = require("express").Router();
const Post = require("../models/post");
const Like = require("../models/like");

postRouter.get("/:id", async (request, response, next) => {
  try {
    const { id } = request.params;

    if (!id) {
      return response.status(400).json({ error: "Please provide a valid id" });
    }

    const post = await Post.findById(id).populate("likedBy");

    if (!post) {
      return response
        .status(404)
        .json({ error: `Post with id ${id} was not found` });
    }

    return response.json(post);
  } catch (error) {
    next(error);
  }
});

postRouter.get("/", async (request, response, next) => {
  try {
    const posts = await Post.find({}).populate("likedBy");
    return response.json(posts);
  } catch (error) {
    next(error);
  }
});

postRouter.post("/:id/like", async (request, response, next) => {
  try {
    const { id } = request.params;
    const user = request.user;

    if (!id) {
      return response.status(400).json({ error: "Please provide a valid id" });
    }

    const exists = await Post.findById(id);

    if (!exists) {
      return response
        .status(404)
        .json({ error: "The post you are looking for does not exist" });
    }

    const likeExists = await Like.findOne({
      userId: user._id,
      postId: id,
    });

    if (likeExists) {
      return response.status(409).json({
        error: "The same user can not like the same post multiple times",
      });
    }

    const newLikes = exists.likes + 1;

    const post = await Post.findById(id);
    post.likes = newLikes;
    post.likedBy = [...post.likedBy, user._id];
    await post.save();

    // Make sure we save the "like" to keep a like unique
    const like = new Like({ userId: user._id, postId: id });
    await like.save();

    return response.json(post);
  } catch (error) {
    next(error);
  }
});

postRouter.post("/", async (request, response, next) => {
  try {
    const user = request.user;
    const { title, content } = request.body;

    const newPost = new Post({
      title: title,
      content: content,
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
    await user.save();

    return response.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
});

postRouter.patch("/:id", async (request, response, next) => {
  try {
    const { id } = request.params;
    const body = request.body;

    if (!id) {
      return response.status(400).json({ error: "Please provide a valid id" });
    }

    if (!body) {
      return response
        .status(400)
        .json({ error: "Please provide a valid change" });
    }

    const exists = await Post.findById(id);

    if (!exists) {
      return response
        .status(404)
        .json({ error: `Post with id ${id} does not exist` });
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

postRouter.delete("/:id/like", async (request, response, next) => {
  try {
    const { id } = request.params;
    const user = request.user;

    if (!id) {
      return response.status(400).json({ error: "Please provide a valid id" });
    }

    const exists = await Post.findById(id);

    if (!exists) {
      return response
        .status(404)
        .json({ error: `The post with id ${id} does not exist` });
    }

    const likeExists = await Like.findOne({
      userId: user._id,
      postId: id,
    });

    if (!likeExists) {
      return response.status(409).json({
        error: "The user has not liked this post yet",
      });
    }

    const newLikes = exists.likes - 1;

    await Post.findByIdAndUpdate(
      id,
      { likes: newLikes },
      {
        runValidators: true,
        new: true,
      }
    );

    // Remove the "like"
    await Like.findByIdAndDelete(likeExists.id);

    return response.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = postRouter;
