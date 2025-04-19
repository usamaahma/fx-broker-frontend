import React, { useState, useEffect } from "react";
import { Form, Input, Button, Card } from "antd";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { account, kyc } from "../../../utils/axios"; // Add kyc import
import "./real.css";

function Real() {
  const [loading, setLoading] = useState(false);
  const [existingEmails, setExistingEmails] = useState([]);
  const [hasKyc, setHasKyc] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));

        // 1. Fetch existing real accounts
        const accResponse = await account.get("/");
        const emails = accResponse.data.map((acc) =>
          acc.email?.trim().toLowerCase()
        );
        setExistingEmails(emails);

        const kycResponse = await kyc.get(`/${user.id}`);
        console.log(kycResponse.data?.status, "dsjh")
        if (kycResponse?.status === 200 && kycResponse.data?.status === "verified") {
          setHasKyc(true);
        }
      } catch (error) {
        if (error?.response?.status === 404) {
          setHasKyc(false);
        } else {
          console.error("Unexpected error:", error);
        }
      }
    };

    fetchData();
  }, []);

  const onFinish = async (values) => {
    const enteredEmail = values.email.trim().toLowerCase();

    // 💥 Stop if KYC is missing
    if (!hasKyc) {
      toast.warning("Please submit your KYC before requesting a real account.", {
        position: "top-right",
      });
      return;
    }

    // 💥 Check if email already exists
    if (existingEmails.includes(enteredEmail)) {
      toast.warning("This email is already registered!", {
        position: "top-right",
      });
      return;
    }

    setLoading(true);
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
              disabled={!hasKyc}
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </Form.Item>

          {!hasKyc && (
            <p style={{ color: "red", textAlign: "center" }}>
              ⚠️ Please complete your KYC first to proceed.
            </p>
          )}
        </Form>
      </Card>
    </div>
  );
}

export default Real;
