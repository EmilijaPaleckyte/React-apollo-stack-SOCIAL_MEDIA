import { useContext, useEffect, useState } from "react";

import { PostsContext } from "./postcontext";
import { useAuth } from "./authcontext";
import userPfp from "./assets/userpfp.png";

const UserProfile = () => {
  const { user } = useAuth();
  const [username, setUsername] = useState("");
  const { posts, addPost, editPost, deletePost } = useContext(PostsContext);
  const likedPosts = ["Liked Post 1", "Liked Post 2"];

  useEffect(() => {
    if (user && user.username) {
      setUsername(user.username);
    } else {
      setUsername("");
    }
  }, [user]);

  const handleAddPost = () => {
    const newPost = prompt("Enter your new post:");
    if (newPost) addPost(newPost);
  };

  const handleEditPost = (index) => {
    const editedPost = prompt("Edit your post:", posts[index]);
    if (editedPost) editPost(index, editedPost);
  };

  const handleDeletePost = (index) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deletePost(index);
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(to bottom, #8E2DE2, #4A00E0)",
        minHeight: "100vh",
        paddingTop: "50px",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
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
              <h2 style={{ color: "white", marginBottom: "5px" }}>
                {username || "Petras"}
              </h2>
            </div>
          </section>
          <section
            className="col-md-6 mb-4"
            style={{ marginTop: "5px", height: "300px" }}
          >
            <div className="card mt-5 h-100">
              <div className="card-body d-flex flex-column align-items-center">
                <h5 className="card-title text-center mb-3">My Posts</h5>
                {posts.length > 0 ? (
                  posts.map((post, index) => (
                    <div key={index} className="mb-2">
                      {post}
                      <button
                        className="btn btn-outline-primary ms-2"
                        onClick={() => handleEditPost(index)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-outline-danger ms-2"
                        onClick={() => handleDeletePost(index)}
                      >
                        Delete
                      </button>
                    </div>
                  ))
                ) : (
                  <p>No posts available. Add your first post!</p>
                )}
                <button
                  className="btn btn-primary ms-2"
                  onClick={handleAddPost}
                >
                  Add
                </button>
              </div>
            </div>
          </section>
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
