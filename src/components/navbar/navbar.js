import React from "react";
import { Menu, Button } from "antd";
import { useNavigate } from "react-router-dom"; // For navigation
import "./navbar.css"; // Import your CSS file

const Navbar = () => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <div className="navbar">
      {/* Left Side: Logo or Text */}
      <div className="navbar-logo" onClick={() => navigate("/")}>
        FX Broker
      </div>

      {/* Center: Navigation Options */}
      <Menu mode="horizontal" className="navbar-menu">
        <Menu.Item key="home" onClick={() => navigate("/")}>
          Home
        </Menu.Item>
        <Menu.Item key="markets" onClick={() => navigate("/markets")}>
          Markets
        </Menu.Item>
        <Menu.Item key="pricing" onClick={() => navigate("/pricing")}>
          Pricing
        </Menu.Item>
        <Menu.Item key="about" onClick={() => navigate("/about")}>
          About Us
        </Menu.Item>
        <Menu.Item key="contact" onClick={() => navigate("/contact")}>
          Contact
        </Menu.Item>
      </Menu>

      {/* Right Side: Login Button */}
      <div className="navbar-login">
        <Button
          type="primary"
          className="login-button"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
