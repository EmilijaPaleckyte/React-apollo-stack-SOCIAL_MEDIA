import { AuthProvider, useAuth } from "./components/authcontext"; // Ensure useAuth is available
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

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
              <Route path="/profile" element={<UserProfileWrapper />} />
            </Routes>
          </Router>
        </PostsProvider>
      </AuthProvider>
  );
}

// Wrapper component to pass the username prop
const UserProfileWrapper = () => {
  const { user } = useAuth(); // Retrieve the user from the context
  return <UserProfile username={user?.username} />; // Pass the username prop
};

export default App;
