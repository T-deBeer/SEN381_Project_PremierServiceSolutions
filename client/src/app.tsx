import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./presentation-layer/LandingPage";
import ErrorPage from "./presentation-layer/ErrorPage";
import LoginPage from "./presentation-layer/LoginPage";
import ServiceDeptPage from "./presentation-layer/ServiceDeptPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<LoginPage />} />
        <Route path="/serviceDept" element={<ServiceDeptPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}
