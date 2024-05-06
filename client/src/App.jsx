import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Header from "./components/header";
import Home from "./components/home";
import SignInForm from "./components/signin";
import SignUpForm from "./components/signup";
import UserProfile from "./components/profile";

function App() {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />{" "}
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/signin" element={<SignInForm />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
