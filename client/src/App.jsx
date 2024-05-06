import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Header from "./components/header";
import Home from "./components/home";
import SignInForm from "./components/signin";
import SignUpForm from "./components/signup";

function App() {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />{" "}
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/signin" element={<SignInForm />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
