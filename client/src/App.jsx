import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { AuthProvider } from "./components/authcontext";
import Header from "./components/header";
import Home from "./components/home";
import { PostsProvider } from "./components/postcontext";
import SignInForm from "./components/signin";
import SignUpForm from "./components/signup";
import UserProfile from "./components/profile";

function App() {
  return (
    <AuthProvider>
      <PostsProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/signin" element={<SignInForm />} />
            <Route
              path="/profile"
              element={
                  <UserProfile />
              }
            />
          </Routes>
        </Router>
      </PostsProvider>
    </AuthProvider>
  );
}

export default App;
