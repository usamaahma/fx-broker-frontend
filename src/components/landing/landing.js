import React from "react";
import { Card, Row, Col, Button } from "antd";
import { useNavigate } from "react-router-dom";
import {
  UserAddOutlined,
  WalletOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import "./landing.css";

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "Leverage up to 1:1000",
      icon: "📈",
      content: "Maximize your trading potential with flexible leverage options",
    },
    {
      title: "0 Commission",
      icon: "💸",
      content: "Trade major FX pairs with zero commission charges",
    },
    {
      title: "Fast Execution",
      icon: "⚡",
      content: "99.9% of orders executed in less than 0.1 seconds",
    },
    {
      title: "Regulated Security",
      icon: "🛡️",
      content: "Fully regulated and client funds segregated",
    },
  ];

  const cards = [
    {
      title: "Open an account",
      description: "Click Start Today and complete a few simple steps.",
      icon: <UserAddOutlined style={{ fontSize: "30px" }} />,
    },
    {
      title: "Make a deposit",
      description:
        "Pro Tip – Use USDT for the fastest deposits and withdrawals.",
      icon: <WalletOutlined style={{ fontSize: "30px" }} />,
    },
    {
      title: "Start Trading",
      description:
        "Every professional trader started somewhere. Begin your journey today!",
      icon: <LineChartOutlined style={{ fontSize: "30px" }} />,
    },
  ];

  return (
    <div className="landing-page">
      {/* Hero Section with Video */}
      <section className="hero-section">
        <video autoPlay loop muted className="bg-video">
          <source src="/bg-video.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-content">
          <h1>Trade Global Markets</h1>
          <p>Access 1000+ instruments with tight spreads</p>
          <Button
            type="primary"
            size="large"
            onClick={() => navigate("/signup")}
          >
            Start Trading Now
          </Button>
        </div>
      </section>

      <div className="main-start">
        <div className="start-trading-div">
          <h1>
            How to Start Trading with <br />
            <span style={{ color: "#ffd700" }}>Fizmo Fx Markets</span>
          </h1>
          <Button
            className="button-today"
            type="primary"
            size="large"
            onClick={() => navigate("/signup")}
          >
            Start Today
          </Button>
        </div>
        <Row gutter={[16, 16]} justify="center">
          {cards.map((card, index) => (
            <Col key={index} xs={24} sm={12} md={8}>
              <Card className="card-custom" hoverable>
                <div>{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Why Choose Capital FX?</h2>
        <Row gutter={[24, 24]} className="features-container">
          {features.map((feature, index) => (
            <Col xs={24} sm={12} md={6} key={index}>
              <Card className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.content}</p>
              </Card>
            </Col>
          ))}
        </Row>
      </section>
      {/* Footer */}
      <footer className="landing-footer">
        <h1 style={{ marginBottom: "2rem" }}>GET OUR BACK</h1>
        <div className="footer-content">
          <div className="footer-section">
            <h4>Company</h4>
            <p>About Us</p>
            <p>Regulations</p>
            <p>Careers</p>
          </div>
          <div className="footer-section">
            <h4>Trading</h4>
            <p>Platforms</p>
            <p>Instruments</p>
            <p>Education</p>
          </div>
          <div className="footer-section">
            <h4>Support</h4>
            <p>Contact Us</p>
            <p>FAQ</p>
            <p>Documentation</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2023 Capital FX. All rights reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
