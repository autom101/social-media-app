const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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
