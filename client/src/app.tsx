import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./presentation-layer/LandingPage";
import ErrorPage from "./presentation-layer/ErrorPage";
import LoginPage from "./presentation-layer/LoginPage";
import ServiceDeptPage from "./presentation-layer/ServiceDeptPage";
import SignUpPage from "./presentation-layer/SignUpPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/serviceDept" element={<ServiceDeptPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}
