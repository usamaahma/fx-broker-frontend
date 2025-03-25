import React from "react";
import "./about.css";

function AboutUs() {
  return (
    <section className="about-container">
      <h1 className="about-title">About Us</h1>
      <p className="about-description">
        We at <span className="highlight">Aljadeed Capitals FX</span> serve individual and institutional financial specialists, providing sophisticated tools and services that meet our customers' needs, such as <span className="highlight">Vertex FX</span>.
      </p>

      <div className="about-section">
        <h2 className="section-title">Product Offering</h2>
        <p className="section-description">
          In addition, we provide exchange services for more than <span className="highlight">50 currency pairs</span>, as well as indices, CFDs, gold, silver, oil, and other commodities.
        </p>
      </div>

      <div className="quote">
        <p>
          “Presently, <span className="highlight">Al Jadeed Capitals Fx</span> is known as the number 1 & most viewed forex-related site all over the world.”
        </p>
      </div>

      <div className="about-features">
        <div className="feature-box">
          <h3>Innovative Approach</h3>
          <p>
            Join us for cutting-edge technology, tools, and strategies, staying ahead in the ever-evolving trading landscape.
          </p>
        </div>
        <div className="feature-box">
          <h3>Professional Growth</h3>
          <p>
            Advance your career in a collaborative environment that prioritizes continuous learning and skill development.
          </p>
        </div>
        <div className="feature-box">
          <h3>Global Opportunities</h3>
          <p>
            Explore diverse markets and assets, gaining valuable experience and exposure to international trading opportunities.
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
