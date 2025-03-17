import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./components/auth/login";
import SignupPage from "./components/auth/signup";
import Landing from "./components/landing/landing";

const AppRouter = () => {
  const isAuthenticated = false; // Change this logic based on authentication state

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/"
          element={
            isAuthenticated ? <Landing /> : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
