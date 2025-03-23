import React from "react";
import { MailOutlined, PhoneOutlined, EnvironmentOutlined } from "@ant-design/icons";
import "./contact.css";

function ContactUs() {
  return (
    <section className="contact-container">
      <h1 className="contact-title">Contact Us</h1>
      <p className="contact-description">
        Have a question or require specialist assistance? Contact our dedicated customer service team who are available 24/7 to assist you!
      </p>
      <div className="contact-details">
        <div className="contact-item">
          <MailOutlined className="contact-icon" />
          <p>Email: helpaljadeedcapitals@gmail.com</p>
        </div>
        {/* <div className="contact-item">
          <PhoneOutlined className="contact-icon" />
          <p>Phone: +1 (234) 567-890</p>
        </div> */}
        {/* <div className="contact-item">
          <EnvironmentOutlined className="contact-icon" />
          <p>Location: 123 Wall Street, New York, NY</p>
        </div> */}
      </div>
    </section>
  );
}

export default ContactUs;
