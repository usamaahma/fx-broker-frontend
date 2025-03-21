import React from "react";
import { Menu, Button, Dropdown } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contextapi/authcontext";
import "./navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token, logoutUser, user } = useAuth();

  // Agar location "/myaccount" ho toh navbar hide hoga
  const shouldHideNavbar = location.pathname === "/myaccount";

  // Dropdown Menu for Logged-in User
  const userMenu = (
    <Menu>
      <Menu.Item key="myaccount" onClick={() => navigate("/myaccount")}>
        My Account
      </Menu.Item>
      <Menu.Item key="logout" onClick={logoutUser}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    !shouldHideNavbar && ( // Agar "My Account" page hai toh navbar render nahi hoga
      <div className="navbar">
        <div className="navbar-logo" onClick={() => navigate("/")}>
          CAPITAL FX
        </div>
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

          {token && (
            <Menu.Item key="myaccount" onClick={() => navigate("/myaccount")}>
              My Account
            </Menu.Item>
          )}
        </Menu>

        <div className="navbar-login">
          {token ? (
            <Dropdown overlay={userMenu} trigger={["click"]}>
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
    )
  );
};

export default Navbar;
