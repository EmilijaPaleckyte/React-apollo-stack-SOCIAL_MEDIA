import "./button.css";

const TagsCard = () => {
  return (
    <div
      className="col-md-6 mb-4"
      style={{ marginTop: "50px", height: "300px" }}
    >
      {/* Tags card */}
      <div className="card mt-5 h-100">
        <div className="card-body d-flex flex-column align-items-center">
          <h5 className="card-title text-center mb-3">Tags</h5>
          <div className="d-flex flex-wrap justify-content-center">
            <button className="btn btn-primary btn-tag me-2 mb-2">Tag1</button>
            <button className="btn btn-primary btn-tag me-2 mb-2">Tag2</button>
            <button className="btn btn-primary btn-tag me-2 mb-2">Tag3</button>
            {/* Add more tags */}
          </div>
        </div>
      </div>
    </div>
  );
};

const PostFeed = () => {
  return (
    <div
      className="col-md-6 mb-4"
      style={{ marginTop: "50px", height: "300px" }}
    >
      {/* Post feed */}
      <div className="card mt-5 h-100">
        <div className="card-body">
          <h5 className="card-title text-center mb-3">Post Feed</h5>
          {/* Example Post */}
          <div className="d-flex flex-column">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="fw-bold">Username</span>
              <button className="btn btn-outline-primary btn-favorite">
                Favorite
              </button>
            </div>
            <p>Post Info Lorem ipsum dolor sit amet...</p>
          </div>
          {/* Add more posts */}
        </div>
      </div>
    </div>
  );
};

const App = () => {
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
          <TagsCard />
        </div>
      </div>
    </div>
  );
};

export default App;
