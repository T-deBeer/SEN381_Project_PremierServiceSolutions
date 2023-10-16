import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./presentation-layer/LandingPage";
import ErrorPage from "./presentation-layer/ErrorPage";
import LoginPage from "./presentation-layer/LoginPage";
import { UserProvider } from "./data-layer/context-classes/UserContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <UserProvider>
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<LoginPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </React.StrictMode>
  </UserProvider>
);
