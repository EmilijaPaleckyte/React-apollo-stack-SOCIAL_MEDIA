import "./button.css"; // Import your button CSS file

import React, { useState } from "react";

import userPfp from "./assets/userpfp.png"; // Import user profile picture

const UserProfile = () => {
  const [posts, setPosts] = useState(["Post 1", "Post 2"]);
  const [likedPosts, setLikedPosts] = useState([
    "Liked Post 1",
    "Liked Post 2",
  ]);

  const addPost = () => {
    const newPost = prompt("Enter your new post:");
    if (newPost) {
      setPosts([...posts, newPost]);
    }
  };

  const editPost = (index) => {
    const editedPost = prompt("Edit your post:", posts[index]);
    if (editedPost) {
      const updatedPosts = [...posts];
      updatedPosts[index] = editedPost;
      setPosts(updatedPosts);
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(to bottom, #8E2DE2, #4A00E0)",
        minHeight: "100vh",
        paddingTop: "70px",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          {/* User Profile Section */}
          <section
            className="col-md-12 mb-4 text-center"
            style={{ marginTop: "70px" }}
          >
            <div style={{ marginBottom: "10px" }}>
              <img
                src={userPfp}
                alt="User Profile"
                style={{ width: "150px", borderRadius: "50%" }}
              />
              <h2 style={{ color: "white", marginBottom: "5px" }}>Username</h2>
            </div>
          </section>

          {/* My Posts Section */}
          <section
            className="col-md-6 mb-4"
            style={{ marginTop: "5px", height: "300px" }}
          >
            <div className="card mt-5 h-100">
              <div className="card-body d-flex flex-column align-items-center">
                <h5 className="card-title text-center mb-3">My Posts</h5>
                {posts.map((post, index) => (
                  <div key={index} className="mb-2">
                    {post}
                    <button
                      className="btn btn-primary btn-tag ms-2"
                      onClick={() => editPost(index)}
                    >
                      Edit Post
                    </button>
                  </div>
                ))}
                <button
                  className="btn btn-primary btn-tag ms-2"
                  onClick={addPost}
                >
                  Add Post
                </button>
              </div>
            </div>
          </section>

          {/* Liked Posts Section */}
          <section
            className="col-md-6 mb-4"
            style={{ marginTop: "5px", height: "300px" }}
          >
            <div className="card mt-5 h-100">
              <div className="card-body">
                <h5 className="card-title text-center mb-3">Liked Posts</h5>
                {likedPosts.map((likedPost, index) => (
                  <div key={index}>{likedPost}</div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
