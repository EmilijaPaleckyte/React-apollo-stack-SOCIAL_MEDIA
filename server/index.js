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
  user: async ({ id }) => await User.findById(id),
  postsByUser: async ({ userId }) => await Post.find({ author: userId }),
  getAllUsers: async () => await User.find(),
  createUser: async ({ input }) => {
    try {
      // Create a new user document using the input data
      const newUser = await User.create(input);
      // Return the newly created user object
      return newUser;
    } catch (error) {
      // If there's an error, log it and throw an error
      console.error("Error creating user:", error);
      throw new Error("Failed to create user");
    }
  },
  createPost: async ({ input }) => await Post.create(input),
  likePost: async ({ postId }) => await Like.create({ post: postId }),
  createTag: async ({ name }) => await Tag.create({ name }),
  createCategory: async ({ name }) => await Category.create({ name }),
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
      throw new Error("Failed to sign in");
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
