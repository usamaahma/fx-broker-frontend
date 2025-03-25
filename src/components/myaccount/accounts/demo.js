import React, { useState } from "react";
import { Form, Input, Button, Card } from "antd";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { account } from "../../../utils/axios"; // API file import
import "./demo.css"; // Import the CSS file

function Demo() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm(); // Ant Design Form instance

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user")); 
      const userId = user?.id || null; 

      const payload = { ...values, accountType: "demo", userId };

      const response = await account.post("/", payload);
      toast.success("Demo account request submitted successfully!", {
        position: "top-right",
      });

      form.resetFields(); // ✅ Inputs reset کریں
      console.log("API Response:", response.data);
    } catch (error) {
      toast.error("Failed to submit request. Please try again.", {
        position: "top-right",
      });
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="demo-container">
      <Card className="demo-card">
        <h2 className="demo-heading">Request For a Demo Account</h2>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name!" }]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Enter a valid email!" },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Amount"
            name="amount"
            rules={[{ required: true, message: "Please enter an amount!" }]}
          >
            <Input placeholder="Enter amount" type="number" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="submit-btn"
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Demo;
