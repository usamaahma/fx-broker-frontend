import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import "./forgetpass.css"; // Import your custom styles
import { forgetPassword } from "../../utils/axios";
import { toast } from "react-toastify";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await forgetPassword.post("/", { email });
      toast.success(
        "Forget Password link is sent to your given email address."
      );
      form.resetFields();
    } catch (err) {
      // Check if it's an API call error or another issue
      if (err.response) {
        // Specific error from the server (e.g., 4xx, 5xx status code)
        message.error(
          "Failed to send password reset email. Please register with us."
        );
      } else if (err.request) {
        // No response from the server (e.g., network issues)
        message.error(
          "Unable to send email. Please check your internet connection."
        );
      } else {
        // Other errors (e.g., issues in setting up the request)
        message.error("Failed to send password. Please try again later.");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-wrapper">
      <div className="forgot-password-container">
        <h2>Forgot Password</h2>
        <Form onFinish={handleSubmit} layout="vertical">
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="forgot-password-input"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="forgot-password-btn"
            >
              Send Reset Link
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default ForgotPassword;
