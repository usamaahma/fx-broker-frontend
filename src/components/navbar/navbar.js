import React from 'react';
import { Menu, Button } from 'antd';
import './navbar.css'; // Import your CSS file

const Navbar = () => {
    return (
        <div className="navbar">
            {/* Left Side: Logo or Text */}
            <div className="navbar-logo">
                FX Broker
            </div>

            {/* Center: Navigation Options */}
            <Menu mode="horizontal" className="navbar-menu">
                <Menu.Item key="home">Home</Menu.Item>
                <Menu.Item key="markets">Markets</Menu.Item>
                <Menu.Item key="pricing">Pricing</Menu.Item>
                <Menu.Item key="about">About Us</Menu.Item>
                <Menu.Item key="contact">Contact</Menu.Item>
            </Menu>

            {/* Right Side: Login Button */}
            <div className="navbar-login">
                <Button type="primary" className="login-button">
                    Login
                </Button>
            </div>
        </div>
    );
};

export default Navbar;