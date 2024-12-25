import "./App.css";
import Home from "./Pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignupPage from "./Pages/Signup";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signUp" element={<SignupPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
