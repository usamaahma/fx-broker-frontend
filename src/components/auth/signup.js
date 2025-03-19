import React, { useState } from "react";
import { Form, Input, Button, Card, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import { register } from "../../utils/axios"; // API call
import { useAuth } from "../contextapi/authcontext"; // Use Auth Context
import "./signup.css"; // Import CSS file

const { Title, Text } = Typography;

const SignupPage = () => {
  const navigate = useNavigate();
  const { loginUser } = useAuth(); // Get loginUser from context
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const response = await register.post("/register", values); // API call
      loginUser(response.data.token); // Save token in context
      message.success("Signup successful!");
      navigate("/"); // Redirect after signup
    } catch (error) {
      message.error(error.response?.data?.message || "Signup failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <Card className="signup-card">
        <Title level={2} className="signup-title">
          Sign Up
        </Title>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label={<Text className="signup-label">Name</Text>}
            name="name"
            rules={[{ required: true, message: "Please enter your name!" }]}
          >
            <Input placeholder="Enter your name" className="signup-input" />
          </Form.Item>

          <Form.Item
            label={<Text className="signup-label">Email</Text>}
            name="email"
            rules={[{ required: true, message: "Please enter your email!" }]}
          >
            <Input placeholder="Enter your email" className="signup-input" />
          </Form.Item>

          <Form.Item
            label={<Text className="signup-label">Password</Text>}
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password
              placeholder="Enter your password"
              className="signup-input"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="signup-button"
              loading={loading}
            >
              Sign Up
            </Button>
          </Form.Item>
        </Form>

        <div className="login-text">
          <Text>
            Already have an account?{" "}
            <span className="login-link" onClick={() => navigate("/login")}>
              Login
            </span>
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default SignupPage;
