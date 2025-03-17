import React from "react";
import { Form, Input, Button, Card, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const LoginPage = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Success:", values);
    // Add login logic here
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <Card className="w-96 p-6 border-2 border-black bg-white shadow-lg rounded-lg">
        <Title level={2} className="text-center text-black">
          Login
        </Title>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label={<Text className="text-black">Email</Text>}
            name="email"
            rules={[{ required: true, message: "Please enter your email!" }]}
          >
            <Input placeholder="Enter your email" className="border-black" />
          </Form.Item>

          <Form.Item
            label={<Text className="text-black">Password</Text>}
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password placeholder="Enter your password" className="border-black" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-[#ffd700] border-black text-black hover:opacity-90"
            >
              Login
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center">
          <Text className="text-black">
            Don't have an account? {" "}
            <span
              className="text-[#ffd700] cursor-pointer hover:underline"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </span>
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
