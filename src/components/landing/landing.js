import React from "react";
import { Card, Row, Col, Button } from "antd";
import { useNavigate } from "react-router-dom";
import {
  UserAddOutlined,
  WalletOutlined,
  LineChartOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import "./landing.css";

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "1:1000",
      icon: "📈",
      content: "Maximize trading potential with flexible leverage options.",
    },
    {
      title: "Zero Delay",
      icon: <ClockCircleOutlined />,
      content: "Trade market with zero delay and fast execution on charts",
    },
    {
      title: "Fast Execution",
      icon: "⚡",
      content: "orders executed instantly with ultra-low latency",
    },
    {
      title: "Security",
      icon: "🛡️",
      content: "Fully secure and protected with advanced encryption",
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
          <p>Access 1000+ instruments with Fast Execution</p>
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
            How to start trading in <br />
            <span style={{ color: "#ffd700" }}>Financial markets</span>
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
        <h2 className="section-title">Why Choose US?</h2>
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

    </div>
  );
};

export default Landing;
