import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import ForgotPass from "./Pages/ForgotPass";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPass />} />
      </Routes>
    </Router>
  );
}

export default App;
