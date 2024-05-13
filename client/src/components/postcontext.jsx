import { createContext, useState } from "react";

import PropTypes from "prop-types";

export const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState(["First Post", "Second Post"]);
  const [likedPosts, setLikedPosts] = useState([]);

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

  const toggleLike = (index) => {
    // Check if the post is already liked
    if (likedPosts.includes(index)) {
      // Unlike the post
      setLikedPosts((prevLikedPosts) => prevLikedPosts.filter((postId) => postId !== index));
    } else {
      // Like the post
      setLikedPosts((prevLikedPosts) => [...prevLikedPosts, index]);
    }
  };

  return (
    <PostsContext.Provider value={{ posts, addPost, editPost, deletePost, toggleLike, likedPosts }}>
      {children}
    </PostsContext.Provider>
  );
};

PostsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
