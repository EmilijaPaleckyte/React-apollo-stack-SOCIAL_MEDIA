import { gql, useMutation } from "@apollo/client";

import PropTypes from "prop-types";
import UserProfile from "./profile";
import { useState } from "react";

const SignInForm = ({ setUsername }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    getUserByEmailAndPassword(email: $email, password: $password) {
      _id
      email
      username  
    }
  }
`;

  const [signIn] = useMutation(SIGN_IN);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const { data } = await signIn({
        variables: {
          email: formData.email,
          password: formData.password,
        },
      });
  
      if (data.getUserByEmailAndPassword) {
        console.log("User signed in successfully:", data.getUserByEmailAndPassword);
        setShowSuccess(true);
        setUsername(data.getUserByEmailAndPassword.username);  // Make sure this matches the field returned by your GraphQL resolver
      } else {
        console.error("No user data returned");
      }
    } catch (error) {
      console.error("Error signing in:", error);
      alert('Failed to sign in. Please check your credentials and try again.'); // Improve error feedback
    }
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };

  return (
    <div
      style={{
        background: "linear-gradient(to bottom, #8E2DE2, #4A00E0)",
        height: "100vh",
      }}
      className="d-flex align-items-center justify-content-center"
    >
      <div className="col-md-6">
        <div className="card mt-5">
          <div className="card-body">
            <h2 className="card-title text-center">Sign In</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="text-center">
                <button className="btn btn-outline-primary btn-favorite">
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {showSuccess && (
        <div className="position-fixed top-50 start-50 translate-middle">
          <div className="card text-white bg-success mb-3">
            <div className="card-header">Success!</div>
            <div className="card-body">
              <h5 className="card-title">Sign In Successful</h5>
              <p className="card-text">
                You have successfully signed in. Click below to proceed.
              </p>
              <button
                className="btn btn-light text-primary"
                onClick={handleCloseSuccess}
                style={{ marginRight: "10px" }}
              >
                Close
              </button>
              <a href="/profile" className="btn btn-primary">
                Go to Profile
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

SignInForm.propTypes = {
  setUsername: PropTypes.func.isRequired,
};

const App = () => {
  const [username, setUsername] = useState(""); // Change initial state to an empty string

  return (
    <div>
      {username ? (
        <UserProfile username={username} /> // Render UserProfile if username is set
      ) : (
        <SignInForm setUsername={setUsername} />
      )}
    </div>
  );
};

export default App;
