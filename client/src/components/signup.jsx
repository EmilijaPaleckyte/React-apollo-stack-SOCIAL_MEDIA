import "./button.css";

import { gql, useMutation } from "@apollo/client";

import { useState } from "react";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

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

  const [signUp, { data, loading, error }] = useMutation(SIGN_UP);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await signUp({
        variables: {
          input: {
            username: formData.username,
            email: formData.email,
          },
        },
      });
      console.log("User signed up:", data.createUser);
      // Optionally, redirect the user to another page or show a success message
    } catch (error) {
      console.error("Error signing up:", error);
      // Display error message to the user
    }
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
              <div className="text-center">
                <button className="btn btn-outline-primary btn-favorite">
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
