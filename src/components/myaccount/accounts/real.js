import React, { useState, useEffect } from "react";
import { Form, Input, Button, Card } from "antd";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { account } from "../../../utils/axios";
import "./real.css";

function Real() {
  const [loading, setLoading] = useState(false);
  const [existingEmails, setExistingEmails] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await account.get("/");

        if (!response || response.status !== 200) {
          throw new Error("Invalid response from server");
        }

        // Ensure response.data is an array of objects containing email
        const emails = response.data.results.map((acc) =>
          acc.email?.trim().toLowerCase()
        );
        setExistingEmails(emails); // Directly update existingEmails state
      } catch (error) {
        console.error("Error fetching accounts:", error);
        toast.warning("Request Here, Have email 😉 !", {
          position: "top-right",
        });
      }
    };

    fetchAccounts(); // Call API when component mounts
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    const enteredEmail = values.email.trim().toLowerCase();
    console.log("Entered Email:", enteredEmail);
    console.log("Existing Emails Before Check:", existingEmails);

    if (existingEmails.includes(enteredEmail)) {
      toast.warning("This email is already registered!", {
        position: "top-right",
      });
      setLoading(false);
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const payload = {
        ...values,
        email: enteredEmail,
        accountType: "real",
        userId: user?.id || null,
      };

      const response = await account.post("/", payload);
      toast.success("Real account request submitted successfully!", {
        position: "top-right",
      });

      // Update existing emails list
      setExistingEmails([...existingEmails, enteredEmail]);

      form.resetFields();
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
        <h2 className="real-heading">Request for a Real Account</h2>
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
