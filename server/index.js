const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// GraphQL schema and resolvers
const schema = require("./graphql/schema");
const {
  User,
  Post,
  Like,
  Tag,
  Category,
} = require("./models/schemaCollection");

// Constants for authentication
const JWT_SECRET = process.env.JWT_SECRET;
const SALT_ROUNDS = 10;

// Connecting to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });

// Resolvers
const root = {
  user: async ({ id }) => {
    try {
      return await User.findById(id);
    } catch (error) {
      console.error("Error fetching user:", error);
      throw new Error("Failed to fetch user");
    }
  },
  postsByUser: async ({ userId }) => {
    try {
      return await Post.find({ author: userId });
    } catch (error) {
      console.error("Error fetching posts by user:", error);
      throw new Error("Failed to fetch posts by user");
    }
  },
  getAllUsers: async () => {
    try {
      return await User.find();
    } catch (error) {
      console.error("Error fetching all users:", error);
      throw new Error("Failed to fetch users");
    }
  },
  createUser: async ({ input }) => {
    try {
      console.log("Creating user with input:", input);
      input.password = await bcrypt.hash(input.password, SALT_ROUNDS);
      const newUser = await User.create(input);
      console.log("User created successfully:", newUser);
      return newUser;
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Failed to create user: " + error.message); // Include the original error message for clarity
    }
  },
  createPost: async ({ input }) => {
    try {
      // Validate input fields
      if (!input.title || !input.content || !input.author) {
        throw new Error("Title, content, and author are required fields.");
      }
      // Create a new post document in the database
      const newPost = await Post.create(input);
      // Return the newly created post
      return newPost;
    } catch (error) {
      console.error("Error creating post:", error);
      throw new Error("Failed to create post: " + error.message);
    }
  },
  likePost: async ({ postId }) => {
    try {
      return await Like.create({ post: postId });
    } catch (error) {
      console.error("Error liking post:", error);
      throw new Error("Failed to like post");
    }
  },
  createTag: async ({ name }) => {
    try {
      return await Tag.create({ name });
    } catch (error) {
      console.error("Error creating tag:", error);
      throw new Error("Failed to create tag");
    }
  },
  createCategory: async ({ name }) => {
    try {
      return await Category.create({ name });
    } catch (error) {
      console.error("Error creating category:", error);
      throw new Error("Failed to create category");
    }
  },
  signIn: async ({ email, password }) => {
    try {
      console.log(`Attempting to sign in with email: ${email}`);

      const user = await User.findOne({ email });
      if (!user) {
        console.error(`User not found with email: ${email}`);
        throw new Error("Invalid credentials");
      }

      console.log(
        `User found: ${user.email}, password provided: ${password}, stored password: ${user.password}`
      );

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        console.error(`Invalid password for email: ${email}`);
        throw new Error("Invalid credentials");
      }

      const payload = { userId: user._id, email: user.email };
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

      console.log(`Sign-in successful for email: ${email}`);
      return token;
    } catch (error) {
      console.error("Error during sign-in:", error.message);
      throw new Error("Failed to sign in: " + error.message);
    }
  },
  Post: {
    author: async (parent) => await User.findById(parent.author),
    likes: async (parent) => await Like.find({ post: parent.id }),
    tags: async (parent) => await Tag.find({ _id: { $in: parent.tags } }),
    categories: async (parent) =>
      await Category.find({ _id: { $in: parent.categories } }),
  },
  Like: {
    user: async (parent) => await User.findById(parent.user),
    post: async (parent) => await Post.findById(parent.post),
  },
};

const app = express();
app.use(cors());

// Use graphqlHTTP middleware with schema and resolvers
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
    customFormatErrorFn: (err) => {
      console.error("GraphQL Error:", err);
      return {
        message: err.message,
        locations: err.locations,
        path: err.path,
        extensions: err.extensions,
      };
    },
  })
);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).send("Internal Server Error");
});

// Route handler for the root URL
app.get("/", (req, res) => {
  res.send("Welcome to the GraphQL API!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
