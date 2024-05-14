// Mongoose Schemas/Models
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
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

// Update an existing post
const updatePost = async (postId, title, content) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { title, content },
      { new: true }
    );
    return updatedPost;
  } catch (error) {
    console.error("Error updating post:", error);
    throw new Error("Failed to update post: " + error.message);
  }
};

// Delete a post by its ID
const deletePost = async (postId) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(postId);
    return deletedPost;
  } catch (error) {
    console.error("Error deleting post:", error);
    throw new Error("Failed to delete post: " + error.message);
  }
};

module.exports = { User, Post, Like, Tag, Category, updatePost, deletePost };
