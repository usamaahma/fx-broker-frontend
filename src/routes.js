import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./components/contextapi/authcontext"; // Import AuthContext
import LoginPage from "./components/auth/login";
import Navbar from "./components/navbar/navbar";
import SignupPage from "./components/auth/signup";
import Landing from "./components/landing/landing";
import MyAccount from "./components/myaccount/myaccount";
import Footer from "./components/footer/footer";
import ContactUs from "./components/landing/contact";
import AboutUs from "./components/landing/about";
import Forgetpassword from "./components/auth/forgetpassword";

const AppRouter = () => {
  const { token } = useAuth(); // Get token from context
  const isAuthenticated = !!token; // Convert token to boolean

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes (Accessible by everyone) */}
        <Route path="/" element={<Landing />} />
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <LoginPage />
            ) : (
              <Navigate to="/myaccount" replace />
            )
          }
        />
        <Route
          path="/signup"
          element={
            !isAuthenticated ? (
              <SignupPage />
            ) : (
              <Navigate to="/myaccount" replace />
            )
          }
        />

        {/* Private Route: Only accessible if logged in */}
        <Route
          path="/myaccount"
          element={
            isAuthenticated ? <MyAccount /> : <Navigate to="/login" replace />
          }
        />

        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/forget-password" element={<Forgetpassword />} />

        {/* Catch-all route (404 or Redirect) */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default AppRouter;
