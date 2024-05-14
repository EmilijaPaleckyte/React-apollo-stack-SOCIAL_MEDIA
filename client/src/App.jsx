import { AuthProvider, useAuth } from "./components/authcontext"; // Ensure useAuth is available
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

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
            <Route path="/profile" element={<ProtectedUserProfile />} />
          </Routes>
        </Router>
      </PostsProvider>
    </AuthProvider>
  );
}

// Wrapper component to pass the username prop only if authenticated
const ProtectedUserProfile = () => {
  const { user } = useAuth(); // Retrieve the user from the context

  // If user is authenticated, render the UserProfile component, otherwise redirect to signin page
  return user ? (
    <UserProfile username={user?.username} />
  ) : (
    <Navigate to="/signin" />
  );
};

export default App;
