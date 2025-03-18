import React from "react";
import { Menu, Button, Dropdown } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contextapi/authcontext"; // Import auth context
import "./navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, logoutUser, user } = useAuth(); // Get token, user info & logout function

  return (
    <div className="navbar">
      {/* Left Side: Logo */}
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

        {/* My Account - Only Show if User is Logged In */}
        {token && (
          <Menu.Item key="myaccount" onClick={() => navigate("/myaccount")}>
            My Account
          </Menu.Item>
        )}
      </Menu>

      {/* Right Side: User Profile or Login */}
      <div className="navbar-login">
        {token ? (
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="logout" onClick={logoutUser}>
                  Logout
                </Menu.Item>
              </Menu>
            }
            trigger={["click"]}
          >
            <Button type="primary" className="login-button">
              {user?.name || "User"}
            </Button>
          </Dropdown>
        ) : (
          <Button
            type="primary"
            className="login-button"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
