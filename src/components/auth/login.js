import React, { useState } from "react";
import { Form, Input, Button, Card, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { login } from "../../utils/axios"; // API call
import { useAuth } from "../contextapi/authcontext"; // Use Auth Context
import { toast } from "react-toastify"; // Import toast
import "./login.css";

const { Title, Text } = Typography;

const LoginPage = () => {
  const navigate = useNavigate();
  const { loginUser } = useAuth(); // Get loginUser from context
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const response = await login.post("/login", values); // API call
      const user = response.data.user;
      localStorage.setItem("user", JSON.stringify(user));
      loginUser(response.data.tokens.access.token); // Save token in context
      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/myaccount"); // Redirect after login
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Invalid email or password!";
      toast.error(errorMsg, { position: "top-right", autoClose: 3000 }); // Show error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <Title level={2} className="login-title">
          Login
        </Title>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label={<Text className="login-label">Email</Text>}
            name="email"
            rules={[{ required: true, message: "Please enter your email!" }]}
          >
            <Input placeholder="Enter your email" className="login-input" />
          </Form.Item>
          <Form.Item
            label={<Text className="login-label">Password</Text>}
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password
              placeholder="Enter your password"
              className="login-input"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-button"
              loading={loading}
            >
              Login
            </Button>
          </Form.Item>
        </Form>

        <div className="signup-text">
          <Text>
            Don't have an account?{" "}
            <span className="signup-link" onClick={() => navigate("/signup")}>
              Sign Up
            </span>
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
