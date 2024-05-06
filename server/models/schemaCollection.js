const mongoose = require("mongoose");

// Mongoose Schemas/Models
const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
});

const PostSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Like" }],
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
});

const LikeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  createdAt: { type: Date, default: Date.now },
});

const TagSchema = new mongoose.Schema({
  name: String,
});

const CategorySchema = new mongoose.Schema({
  name: String,
});

const User = mongoose.model("User", UserSchema);
const Post = mongoose.model("Post", PostSchema);
const Like = mongoose.model("Like", LikeSchema);
const Tag = mongoose.model("Tag", TagSchema);
const Category = mongoose.model("Category", CategorySchema);

module.exports = { User, Post, Like, Tag, Category };
