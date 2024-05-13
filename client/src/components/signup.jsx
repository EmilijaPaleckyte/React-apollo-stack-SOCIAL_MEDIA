import { gql, useMutation } from "@apollo/client";

import { useAuth } from "./authcontext"; // Import the useAuth hook
import { useState } from "react";

const SignUpForm = () => {
  const { login } = useAuth(); // Get the login function from the useAuth hook

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const SIGN_UP = gql`
    mutation SignUp($input: CreateUserInput!) {
      createUser(input: $input) {
        id
        username
        email
      }
    }
  `;

  const [signUp] = useMutation(SIGN_UP);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match before submitting
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return; // Stop the form submission
    } else {
      setError("");
    }

    try {
      const { data } = await signUp({
        variables: {
          input: {
            username: formData.username,
            email: formData.email,
            password: formData.password, // Include the password in the input
          },
        },
      });
      console.log("User signed up successfully:", data.createUser);

      // Update the authentication context with the signed-up user's information
      login(data.createUser);

      setShowSuccess(true);
    } catch (error) {
      console.error("Error signing up:", error);
      setError("Error signing up. Please try again.");
    }
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    // Redirect the user to another page
  };

  return (
    <div
      style={{
        background: "linear-gradient(to bottom, #8E2DE2, #4A00E0)",
        minHeight: "100vh", // Adjusted minHeight
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="col-md-6">
        <div className="card mt-5">
          <div className="card-body">
            <h2 className="card-title text-center">Sign Up</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username:
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
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
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password:
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              {error && <p className="text-danger">{error}</p>}
              <div className="text-center">
                <button
                  type="submit" // Added type attribute
                  className="btn btn-outline-primary btn-favorite"
                  style={{ marginRight: "10px" }}
                >
                  Sign Up
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
              <h5 className="card-title">Profile Created Successfully</h5>
              <p className="card-text">
                Your profile has been successfully created. Click below to
                proceed.
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

export default SignUpForm;
