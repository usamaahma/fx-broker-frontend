import React, { useState } from "react";
import { Navbar, Nav, Container, NavDropdown, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contextapi/authcontext"; // Auth Context
import Dashboard from "./dashboard";
import "./myaccount.css";
import DocumentUploader from "./document";
import BankDetails from "./bank";
import Deposit from "./deposit";
import Demo from "./accounts/demo";
import Real from "./accounts/real";

const MyAccount = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("dashboard");
  const { user, logoutUser, token } = useAuth();
  const [expanded, setExpanded] = useState(false); // Track navbar state

  const handleMenuClick = (option) => {
    setSelectedOption(option);
    setExpanded(false); // Close navbar on mobile
  };

  const renderContent = () => {
    switch (selectedOption) {
      case "dashboard":
        return <Dashboard />;
      case "document-upload":
        return <DocumentUploader />;
      case "bank-details":
        return <BankDetails />;
      case "deposit":
        return <Deposit />;
      case "withdraw":
        return <div>💸 Withdraw</div>;
      case "deposit-report":
        return <div>📊 Deposit Report</div>;
      case "withdraw-report":
        return <div>📈 Withdraw Report</div>;
      case "helpdesk":
        return <div>❓ Helpdesk</div>;
      case "demo-account":
        return (
          <div>
            <Demo />
          </div>
        );
      case "real-account":
        return (
          <div>
            <Real />
          </div>
        );
      case "accounts-detail":
        return <div>📋 All Accounts Detail</div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="myaccount-container">
      <Navbar expand="lg" expanded={expanded} className="myaccount-navbar">
        <Container>
          <Navbar.Brand onClick={() => navigate("/")} className="navbar-logo">
          Aljadeed Capitals FX
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setExpanded(expanded ? false : true)}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link onClick={() => handleMenuClick("dashboard")}>
                Dashboard
              </Nav.Link>

              <NavDropdown title="KYC Verification" id="kyc-dropdown">
                <NavDropdown.Item
                  onClick={() => handleMenuClick("document-upload")}
                >
                  Document Upload
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => handleMenuClick("bank-details")}
                >
                  Bank Details
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="My Fund" id="fund-dropdown">
                <NavDropdown.Item onClick={() => handleMenuClick("deposit")}>
                  Deposit
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleMenuClick("withdraw")}>
                  Withdraw
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="My Reports" id="reports-dropdown">
                <NavDropdown.Item
                  onClick={() => handleMenuClick("deposit-report")}
                >
                  Deposit Report
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => handleMenuClick("withdraw-report")}
                >
                  Withdraw Report
                </NavDropdown.Item>
              </NavDropdown>

              {/* NEW Accounts Dropdown */}
              <NavDropdown title="Accounts" id="accounts-dropdown">
                <NavDropdown.Item
                  onClick={() => handleMenuClick("demo-account")}
                >
                  Demo Account
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => handleMenuClick("real-account")}
                >
                  Real Account
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => handleMenuClick("accounts-detail")}
                >
                  Accounts Detail
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link onClick={() => handleMenuClick("helpdesk")}>
                Helpdesk
              </Nav.Link>
            </Nav>

            {token ? (
              <NavDropdown title={user?.name || "User"} id="user-dropdown">
                <NavDropdown.Item
                  onClick={() => {
                    logoutUser();
                    setExpanded(false); // Close on logout
                  }}
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Button onClick={() => navigate("/login")}>Login</Button>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="content">{renderContent()}</div>
    </div>
  );
};

export default MyAccount;
