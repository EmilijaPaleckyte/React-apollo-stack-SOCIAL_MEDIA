import { gql, useMutation } from "@apollo/client";

import { useState } from "react";

const SignInForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const SIGN_IN = gql`
    mutation SignIn($email: String!, $password: String!) {
      signIn(email: $email, password: $password)
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

      console.log("User signed in successfully:", data.signIn);
      // Handle successful sign-in here, e.g., redirecting to another page
    } catch (error) {
      console.error("Error signing in:", error);
      // Handle sign-in error, e.g., displaying error message to the user
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
    </div>
  );
};

export default SignInForm;
