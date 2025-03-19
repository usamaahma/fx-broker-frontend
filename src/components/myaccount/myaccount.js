import React, { useState } from "react";
import { Navbar, Nav, Container, NavDropdown, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contextapi/authcontext"; // Auth Context
import Dashboard from "./dashboard"
import "./myaccount.css";

const MyAccount = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("dashboard");
  const { user, logoutUser, token } = useAuth(); // Added 'token' for authentication check
  console.log("Logged-in User:", user); // Console par user ko print karna

  const handleMenuClick = (option) => {
    setSelectedOption(option);
  };

  const renderContent = () => {
    switch (selectedOption) {
      case "dashboard":
        return <div className="content-section"><Dashboard /></div>;
      case "document-upload":
        return <div className="content-section">📂 Document Upload</div>;
      case "bank-details":
        return <div className="content-section">🏦 Bank Details</div>;
      case "deposit":
        return <div className="content-section">💳 Deposit</div>;
      case "withdraw":
        return <div className="content-section">💸 Withdraw</div>;
      case "deposit-report":
        return <div className="content-section">📊 Deposit Report</div>;
      case "withdraw-report":
        return <div className="content-section">📈 Withdraw Report</div>;
      case "helpdesk":
        return <div className="content-section">❓ Helpdesk</div>;
      default:
        return <div className="content-section">🏠 Dashboard Content</div>;
    }
  };

  return (
    <div className="myaccount-container">
      {/* Navbar */}
      <Navbar expand="lg" className="myaccount-navbar">
        <Container>
          <Navbar.Brand onClick={() => navigate("/")} className="navbar-logo">
            FX Broker
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link onClick={() => handleMenuClick("dashboard")}>
                Dashboard
              </Nav.Link>

              {/* KYC Verification */}
              <NavDropdown title="KYC Verification" id="kyc-dropdown">
                <NavDropdown.Item onClick={() => handleMenuClick("document-upload")}>
                  Document Upload
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleMenuClick("bank-details")}>
                  Bank Details
                </NavDropdown.Item>
              </NavDropdown>

              {/* My Fund */}
              <NavDropdown title="My Fund" id="fund-dropdown">
                <NavDropdown.Item onClick={() => handleMenuClick("deposit")}>
                  Deposit
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleMenuClick("withdraw")}>
                  Withdraw
                </NavDropdown.Item>
              </NavDropdown>

              {/* My Reports */}
              <NavDropdown title="My Reports" id="reports-dropdown">
                <NavDropdown.Item onClick={() => handleMenuClick("deposit-report")}>
                  Deposit Report
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleMenuClick("withdraw-report")}>
                  Withdraw Report
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link onClick={() => handleMenuClick("helpdesk")}>Helpdesk</Nav.Link>
            </Nav>

            {/* User Profile Dropdown / Login Button */}
            {token ? (
              <NavDropdown title={user?.name || "User"} id="user-dropdown">
                <NavDropdown.Item onClick={logoutUser}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Button onClick={() => navigate("/login")}>Login</Button>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Content Section */}
      <div className="content">{renderContent()}</div>
    </div>
  );
};

export default MyAccount;
