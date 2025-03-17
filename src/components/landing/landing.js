import React from 'react';
import { Carousel, Card, Row, Col, Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import './landing.css';

const Landing = () => {
  // Carousel images (replace with your actual images)
  const carouselImages = [
    {
      url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3',
      title: 'Trade Global Markets',
      subtitle: 'Access 1000+ instruments with tight spreads'
    },
    {
      url: 'https://images.unsplash.com/photo-1613243555978-636c48dc653f',
      title: 'Advanced Trading Platforms',
      subtitle: 'MT4, MT5 & WebTrader available'
    },
    {
      url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3',
      title: '24/5 Professional Support',
      subtitle: 'Multilingual customer service'
    }
  ];

  // Features data
  const features = [
    {
      title: 'Leverage up to 1:1000',
      icon: '📈',
      content: 'Maximize your trading potential with flexible leverage options'
    },
    {
      title: '0 Commission',
      icon: '💸',
      content: 'Trade major FX pairs with zero commission charges'
    },
    {
      title: 'Fast Execution',
      icon: '⚡',
      content: '99.9% of orders executed in less than 0.1 seconds'
    },
    {
      title: 'Regulated Security',
      icon: '🛡️',
      content: 'Fully regulated and client funds segregated'
    }
  ];

  return (
    <div className="landing-page">
      {/* Hero Carousel */}
      <section className="hero-carousel">
        <Carousel
          arrows
          autoplay
        >
          {carouselImages.map((slide, index) => (
            <div key={index}>
              <div
                className="carousel-slide"
                style={{ backgroundImage: `url(${slide.url})` }}
              >
                <div className="carousel-content">
                  <h1>{slide.title}</h1>
                  <p>{slide.subtitle}</p>
                  <Button type="primary" size="large">
                    Start Trading Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Why Choose FX Broker?</h2>
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

      {/* Market Overview */}
      <section className="market-section">
        <h2 className="section-title">Market Overview</h2>
        <div className="market-table">
          <div className="table-header">
            <span>Instrument</span>
            <span>Bid</span>
            <span>Ask</span>
            <span>Spread</span>
          </div>
          {['EUR/USD', 'GBP/USD', 'USD/JPY', 'XAU/USD'].map((pair, index) => (
            <div className="table-row" key={index}>
              <span>{pair}</span>
              <span>1.0725</span>
              <span>1.0726</span>
              <span>0.1</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Start Your Trading Journey Today!</h2>
          <p>Join over 1 million traders worldwide</p>
          <div className="cta-buttons">
            <Button type="primary" size="large">Open Live Account</Button>
            <Button type="primary" size="large">Try Free Demo</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
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
          <p>© 2023 FX Broker. All rights reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;