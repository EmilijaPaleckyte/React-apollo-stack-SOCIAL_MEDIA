import { createContext, useState } from "react";

import PropTypes from "prop-types";

export const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState(["First Post", "Second Post"]);

  const addPost = (newPost) => {
    setPosts((prevPosts) => [...prevPosts, newPost]);
  };

  const editPost = (index, editedPost) => {
    const updatedPosts = [...posts];
    updatedPosts[index] = editedPost;
    setPosts(updatedPosts);
  };

  const deletePost = (index) => {
    setPosts((prevPosts) => prevPosts.filter((_, i) => i !== index));
  };

  return (
    <PostsContext.Provider value={{ posts, addPost, editPost, deletePost }}>
      {children}
    </PostsContext.Provider>
  );
};

// Add propTypes validation for children
PostsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
