import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";

function Footer() {
    return (
        <footer className="landing-footer">
            <h1 className="footer-title">GET OUR BACK</h1>
            <div className="footer-content">
                <div className="footer-section">
                    <h4>Company</h4>
                    <p>
                        <Link to="/about-us" className="footer-link">About Us</Link>
                    </p>
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
                    <p>
                        <Link to="/contact-us" className="footer-link">Contact Us</Link>
                    </p>
                    <p>FAQ</p>
                    <p>Documentation</p>
                </div>
            </div>
            <div className="footer-warning">
                <p>
                    <strong>Risk Warning:</strong> Online trading in leveraged Foreign
                    Exchange and CFD instruments contains a high level of risk and may not
                    be suitable for all investors. High leverage trading can subject your
                    account to high losses as well as present opportunities for profit.
                    Before taking the decision to invest in margin instruments, you must
                    seriously consider your investment goals, experience level, and risk
                    appetite.
                </p>
            </div>
            <div className="footer-bottom">
                <p>© 2023 Capital FX. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
