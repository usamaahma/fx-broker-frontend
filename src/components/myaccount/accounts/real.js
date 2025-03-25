import React, { useState } from "react";
import { Form, Input, Button, Card } from "antd";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { account } from "../../../utils/axios";
import "./real.css"; // Import CSS file

function Real() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.id || null;
      const payload = { ...values, accountType: "real", userId };

      const response = await account.post("/", payload);
      toast.success("Real account request submitted successfully!", {
        position: "top-right",
      });

      form.resetFields();
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
    <div className="real-container">
      <Card className="real-card">
        <h2 className="real-heading">Request For a Real Account</h2>
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
            label="Phone"
            name="phone"
            rules={[
              { required: true, message: "Please enter your phone number!" },
            ]}
          >
            <Input placeholder="Enter your phone number" type="tel" />
          </Form.Item>

          <Form.Item
            label="Country"
            name="country"
            rules={[{ required: true, message: "Please enter your country!" }]}
          >
            <Input placeholder="Enter your country" />
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

export default Real;
