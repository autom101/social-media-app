const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  username: {
    type: String,
  },
  passwordHash: {
    type: String,
  },
});

userSchema.set("toJSON", {
  transform: (doc, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
    delete returnedObj.passwordHash;
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
