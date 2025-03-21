import React, { useState, useEffect } from "react";
import { Button, Card, Input, Form, message, Table } from "antd";
import { CheckCircleOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { kyc } from "../../utils/axios";
import "./bank.css";

const BankDetails = () => {
  const [status, setStatus] = useState("Pending");
  const [userName, setUserName] = useState("");
  const [bankDetails, setBankDetails] = useState(null);

  const storedUser = localStorage.getItem("user");
  const userId = storedUser ? JSON.parse(storedUser)?.id : null;

  useEffect(() => {
    if (userId) {
      fetchKYCDetails();
    } else {
      console.error("User ID not found in localStorage");
    }
  }, [userId]);

  const fetchKYCDetails = async () => {
    if (!userId) return;
    try {
      const response = await kyc.get(`/${userId}`);
      const { bankDetails, status } = response.data;
      setBankDetails(bankDetails);
      setUserName(bankDetails?.accountHolder || "");
      setStatus(status);
    } catch (error) {
      console.error("Error fetching KYC details:", error);
    }
  };

  const handleSubmission = async (values) => {
    if (!userId) {
      message.error("User ID missing, unable to submit KYC.");
      return;
    }
    try {
      const payload = {
        userId,
        bankDetails: {
          accountHolder: values.accountHolder,
          bankName: values.bankName,
          accountNumber: values.accountNumber,
          ibanNumber: values.iban,
        },
      };

      await kyc.post("/", payload);
      message.success("KYC details submitted successfully!");
      fetchKYCDetails();
    } catch (error) {
      console.error("Error submitting KYC details:", error);
      message.error("Failed to submit KYC details.");
    }
  };

  const columns = [
    {
      title: "Account Holder",
      dataIndex: "accountHolder",
      key: "accountHolder",
    },
    { title: "Bank Name", dataIndex: "bankName", key: "bankName" },
    {
      title: "Account Number",
      dataIndex: "accountNumber",
      key: "accountNumber",
    },
    { title: "IBAN Number", dataIndex: "ibanNumber", key: "ibanNumber" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: () => (
        <span className={`status ${status.toLowerCase()}`}>
          {status === "Pending" ? (
            <ClockCircleOutlined />
          ) : (
            <CheckCircleOutlined />
          )}{" "}
          {status}
        </span>
      ),
    },
  ];

  return (
    <div>
      <div className="bank-container">
        <h2 className="title">Bank KYC Verification</h2>
        <Card title="Bank Details" bordered={false} className="bank-card">
          <Form layout="vertical" onFinish={handleSubmission}>
            <Form.Item
              name="accountHolder"
              label="Account Holder Name"
              rules={[
                { required: true, message: "Please enter account holder name" },
              ]}
            >
              <Input
                placeholder="Account Holder Name"
                className="input-field"
              />
            </Form.Item>
            <Form.Item
              name="bankName"
              label="Bank Name"
              rules={[{ required: true, message: "Please enter bank name" }]}
            >
              <Input placeholder="Bank Name" className="input-field" />
            </Form.Item>
            <Form.Item
              name="accountNumber"
              label="Account Number"
              rules={[
                { required: true, message: "Please enter account number" },
              ]}
            >
              <Input placeholder="Account Number" className="input-field" />
            </Form.Item>
            <Form.Item
              name="iban"
              label="IBAN Number"
              rules={[{ required: true, message: "Please enter IBAN number" }]}
            >
              <Input placeholder="IBAN Number" className="input-field" />
            </Form.Item>
            <Button type="primary" htmlType="submit" className="submit-button">
              Submit
            </Button>
          </Form>
        </Card>
      </div>
      <Card
        bordered={false}
        className="bank-table-card"
        style={{ width: "100%" }}
      >
        <h2>Saved Bank Details</h2>
        <Table
          columns={columns}
          dataSource={bankDetails ? [{ ...bankDetails, status }] : []}
          pagination={false}
          rowKey="accountNumber"
          locale={{ emptyText: "No bank details available" }}
        />
      </Card>
    </div>
  );
};

export default BankDetails;
