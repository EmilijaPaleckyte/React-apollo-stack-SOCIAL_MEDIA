const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type User {
    id: ID!
    username: String!
    email: String!
  }
  
  type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
    likes: [Like]!
    tags: [Tag]!
    categories: [Category]!
  }
  
  type Like {
    id: ID!
    user: User!
    post: Post!
    createdAt: String!
  }

  type Tag {
    id: ID!
    name: String!
  }

  type Category {
    id: ID!
    name: String!
  }

  type Query {
    user(id: ID!): User!
    postsByUser(userId: ID!): [Post]!
    getAllUsers: [User]!
  }
  
  input CreateUserInput {
    username: String!
    email: String!
  }
  
  input CreatePostInput {
    userId: ID!
    title: String!
    content: String!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    createPost(input: CreatePostInput!): Post!
    likePost(postId: ID!): Like!
    createTag(name: String!): Tag!
    createCategory(name: String!): Category!
    signIn(email: String!, password: String!): String! 
  }
`);

module.exports = schema;
