import "./button.css";
import "./selected.css";

import { useContext, useEffect, useState } from "react";

import { PostsContext } from "./postcontext";
import PropTypes from "prop-types";
import { useAuth } from "./authcontext";
import userPfp from "./assets/userpfp.png";

const TagsCard = ({ setSelectedTag, selectedTag }) => {
  return (
    <div className="col-md-6 mb-4" style={{ marginTop: "50px", height: "400px" }}>
      {/* Tags card */}
      <div className="card mt-5 h-100">
        <div className="card-body d-flex flex-column align-items-center">
          <h5 className="card-title text-center mb-3">Popular Tags</h5>
          <div className="d-flex flex-wrap justify-content-center">
            <button
              className={`btn btn-primary btn-tag me-2 mb-2 ${selectedTag === "Fashion" ? "selected" : ""}`}
              onClick={() => setSelectedTag("Fashion")}
            >
              Fashion
            </button>
            <button
              className={`btn btn-primary btn-tag me-2 mb-2 ${selectedTag === "Health" ? "selected" : ""}`}
              onClick={() => setSelectedTag("Health")}
            >
              Health
            </button>
            <button
              className={`btn btn-primary btn-tag me-2 mb-2 ${selectedTag === "Books" ? "selected" : ""}`}
              onClick={() => setSelectedTag("Books")}
            >
              Books
            </button>
            <button
              className={`btn btn-primary btn-tag me-2 mb-2 ${selectedTag === "Technology" ? "selected" : ""}`}
              onClick={() => setSelectedTag("Technology")}
            >
              Technology
            </button>
            <button
              className={`btn btn-primary btn-tag me-2 mb-2 ${selectedTag === "Food" ? "selected" : ""}`}
              onClick={() => setSelectedTag("Food")}
            >
              Food
            </button>
            <button
              className={`btn btn-primary btn-tag me-2 mb-2 ${selectedTag === "News" ? "selected" : ""}`}
              onClick={() => setSelectedTag("News")}
            >
              News
            </button>
            <button
              className={`btn btn-primary btn-tag me-2 mb-2 ${selectedTag === "Travel" ? "selected" : ""}`}
              onClick={() => setSelectedTag("Travel")}
            >
              Travel
            </button>
            <button
              className={`btn btn-primary btn-tag me-2 mb-2 ${selectedTag === "Fitness" ? "selected" : ""}`}
              onClick={() => setSelectedTag("Fitness")}
            >
              Fitness
            </button>
            <button
              className={`btn btn-primary btn-tag me-2 mb-2 ${selectedTag === "Music" ? "selected" : ""}`}
              onClick={() => setSelectedTag("Music")}
            >
              Music
            </button>
            <button
              className={`btn btn-primary btn-tag me-2 mb-2 ${selectedTag === "Art" ? "selected" : ""}`}
              onClick={() => setSelectedTag("Art")}
            >
              Art
            </button>
            <button
              className={`btn btn-primary btn-tag me-2 mb-2 ${selectedTag === "Movies" ? "selected" : ""}`}
              onClick={() => setSelectedTag("Movies")}
            >
              Movies
            </button>
            <button
              className={`btn btn-primary btn-tag me-2 mb-2 ${selectedTag === "Education" ? "selected" : ""}`}
              onClick={() => setSelectedTag("Education")}
            >
              Education
            </button>
            <button
              className={`btn btn-primary btn-tag me-2 mb-2 ${selectedTag === "Sports" ? "selected" : ""}`}
              onClick={() => setSelectedTag("Sports")}
            >
              Sports
            </button>
            <button
              className={`btn btn-primary btn-tag me-2 mb-2 ${selectedTag === "Gaming" ? "selected" : ""}`}
              onClick={() => setSelectedTag("Gaming")}
            >
              Gaming
            </button>
            <button
              className={`btn btn-primary btn-tag me-2 mb-2 ${selectedTag === "Science" ? "selected" : ""}`}
              onClick={() => setSelectedTag("Science")}
            >
              Science
            </button>
            <button
              className={`btn btn-primary btn-tag me-2 mb-2 ${selectedTag === "Finance" ? "selected" : ""}`}
              onClick={() => setSelectedTag("Finance")}
            >
              Finance
            </button>
            <button
              className={`btn btn-primary btn-tag me-2 mb-2 ${selectedTag === "DIY" ? "selected" : ""}`}
              onClick={() => setSelectedTag("DIY")}
            >
              DIY
            </button>
            <button
              className={`btn btn-primary btn-tag me-2 mb-2 ${selectedTag === "Nature" ? "selected" : ""}`}
              onClick={() => setSelectedTag("Nature")}
            >
              Nature
            </button>
            <button
              className={`btn btn-primary btn-tag me-2 mb-2 ${selectedTag === "Photography" ? "selected" : ""}`}
              onClick={() => setSelectedTag("Photography")}
            >
              Photography
            </button>
            <button
              className={`btn btn-primary btn-tag me-2 mb-2 ${selectedTag === "Coding" ? "selected" : ""}`}
              onClick={() => setSelectedTag("Coding")}
            >
              Coding
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

TagsCard.propTypes = {
  setSelectedTag: PropTypes.func.isRequired,
  selectedTag: PropTypes.string,
};

const PostFeed = () => {
  const { user } = useAuth();
  const [username, setUsername] = useState("");
  const { posts } = useContext(PostsContext);
  const [likedPosts, setLikedPosts] = useState({});

  useEffect(() => {
    if (user && user.username) {
      setUsername(user.username);
    } else {
      setUsername("Testie"); 
    }
  }, [user]);

  const handleLikeClick = (index) => {
    setLikedPosts((prevLikedPosts) => ({
      ...prevLikedPosts,
      [index]: !prevLikedPosts[index],
    }));
  };

  return (
    <div className="col-md-6 mb-4" style={{ marginTop: "50px", height: "400px" }}>
      <div className="card mt-5 h-100">
        <div className="card-body">
          <h5 className="card-title text-center mb-3">Post Feed</h5>
          {posts.map((post, index) => (
            <div key={index} className="mb-3">
              <a href="/profile">
                <img src={userPfp} alt="User Profile" style={{ width: "50px", borderRadius: "50%" }} />
              </a>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="fw-bold">{username}</span> {/* Displaying the real username */}
                <button className="btn btn-outline-primary btn-icon" onClick={() => handleLikeClick(index)}>
                  {likedPosts[index] ? <i className="fas fa-heart"></i> : <i className="far fa-heart"></i>}
                </button>
              </div>
              <p>{post}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [selectedTag, setSelectedTag] = useState(null);

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
          <PostFeed />
          <TagsCard setSelectedTag={setSelectedTag} selectedTag={selectedTag} />
        </div>
      </div>
    </div>
  );
};

export default App;