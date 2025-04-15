import React, { useState, useEffect } from "react";
import { Form, Input, Button, Card, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import { register } from "../../utils/axios"; // API call
import { useAuth } from "../contextapi/authcontext"; // Use Auth Context
import {  toast } from "react-toastify";
import "./signup.css"; // Import CSS file

const { Title, Text } = Typography;

const SignupPage = () => {
  const navigate = useNavigate();
  const { loginUser } = useAuth(); // Get loginUser from context
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    console.log("clicked");

    try {
      setLoading(true);
      const response = await register.post("/register", {
        ...values,
      });
      loginUser(response.data.token);
      toast.success("Signup successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed!");
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
          {/* Name */}
          <Form.Item
            label={<Text className="signup-label">Name</Text>}
            name="name"
            rules={[{ required: true, message: "Please enter your name!" }]}
          >
            <Input placeholder="Enter your name" className="signup-input" />
          </Form.Item>

          {/* Email */}
          <Form.Item
            label={<Text className="signup-label">Email</Text>}
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Enter a valid email!",
              },
            ]}
          >
            <Input placeholder="Enter your email" className="signup-input" />
          </Form.Item>

          {/* Password */}
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

          {/* Country Input (Replaced Dropdown with Text Input) */}
          <Form.Item
            label={<Text className="signup-label">Country</Text>}
            name="country"
            rules={[{ required: true, message: "Please enter your country!" }]}
          >
            <Input placeholder="Enter your country name" className="signup-input" />
          </Form.Item>

          <Form.Item
            label={<Text className="signup-label">Phone Number</Text>}
            name="phonenumber"
            rules={[
              { required: true, message: "Please enter your phone number!" },
            ]}
          >
            <Input
              placeholder="Enter Phone Number"
              className="signup-input"
            />
          </Form.Item>

          {/* Submit Button */}
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

        {/* Login Link */}
        <div className="login-text">
          <Text>
            {" "}
            <p style={{ color: "white" }}>Already have an account?</p>{" "}
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
