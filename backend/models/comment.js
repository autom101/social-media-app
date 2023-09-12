const mongoose = require("mongoose");

/* 
Comments have both an author field, and a parentComment field

If a comment has a null parentComment field, that means that it is not replying to a comment, and is standalone.

A comment should never have a null author field.
*/

const commentSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  parentComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
  },
  childComments: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
  },
  content: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  edited: {
    type: Boolean,
  },
  editedAt: {
    type: Date,
  },
  likes: {
    type: Number,
  },
});

commentSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
