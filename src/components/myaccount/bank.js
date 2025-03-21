import React, { useState, useEffect } from "react";
import { Form, Button, Card, Input, message, Spin } from "antd";
import { CheckCircleOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { kyc } from "../../utils/axios"; // Import the axios instance
import "./bank.css";

const BankDetails = () => {
  const [loading, setLoading] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [status, setStatus] = useState("Pending");

  const userData = JSON.parse(localStorage.getItem("user"));
  const userId = userData?.id || userData?._id; // Agar id _id key mein hai

  const fetchBankDetails = async () => {
    setLoading(true);
    try {
      const response = await kyc.get(`/user/${userId}`);
      if (response.data) {
        setSubmittedData(response.data.bankDetails);
        setStatus(response.data.status);
      }
    } catch (error) {
      message.error("Error fetching bank details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBankDetails();
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await kyc.post({ ...values, userId });
      message.success("Bank KYC submitted successfully!");
      fetchBankDetails(); // Fetch submitted data after successful submission
    } catch (error) {
      message.error("Error submitting KYC. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bank-container">
      <h2 className="title">Bank KYC Verification</h2>
      <Card title="Bank Details" bordered={false} className="bank-card">
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Account Holder Name"
            name="accountHolder"
            rules={[{ required: true, message: "Please enter account holder name!" }]}
          >
            <Input placeholder="Enter Account Holder Name" />
          </Form.Item>

          <Form.Item
            label="Bank Name"
            name="bankName"
            rules={[{ required: true, message: "Please enter bank name!" }]}
          >
            <Input placeholder="Enter Bank Name" />
          </Form.Item>

          <Form.Item
            label="Account Number"
            name="accountNumber"
            rules={[{ required: true, message: "Please enter account number!" }]}
          >
            <Input placeholder="Enter Account Number" />
          </Form.Item>

          <Form.Item
            label="IBAN Number"
            name="iban"
            rules={[{ required: true, message: "Please enter IBAN number!" }]}
          >
            <Input placeholder="Enter IBAN Number" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} className="submit-button">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>

      {loading ? (
        <Spin />
      ) : submittedData ? (
        <Card title="Submitted Bank Details" bordered={false} className="submitted-card">
          <p><strong>Account Holder:</strong> {submittedData.accountHolder}</p>
          <p><strong>Bank Name:</strong> {submittedData.bankName}</p>
          <p><strong>Account Number:</strong> {submittedData.accountNumber}</p>
          <p><strong>IBAN:</strong> {submittedData.iban}</p>
          <p><strong>Status:</strong>
            {status === "pending" ? (
              <span className="status pending"><ClockCircleOutlined /> Pending</span>
            ) : (
              <span className="status verified"><CheckCircleOutlined /> Verified</span>
            )}
          </p>
        </Card>
      ) : null}
    </div>
  );
};

export default BankDetails;
