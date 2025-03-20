import React, { useState } from "react";
import { Button, Card, Input, Upload } from "antd";
import {
  UploadOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import "./bank.css";

const BankDetails = () => {
  const [bankDetails, setBankDetails] = useState({
    accountHolder: "",
    bankName: "",
    accountNumber: "",
    iban: "",
    swiftCode: "",
    bankStatement: null,
  });
  const [status, setStatus] = useState("Pending");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBankDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpload = (file) => {
    setBankDetails((prev) => ({ ...prev, bankStatement: file }));
    return false;
  };

  const handleSubmission = () => {
    setStatus("Pending");
    // Backend API call for submission
  };

  return (
    <div className="bank-container">
      <h2 className="title">Bank KYC Verification</h2>
      <Card title="Bank Details" bordered={false} className="bank-card">
        <Input
          placeholder="Account Holder Name"
          name="accountHolder"
          value={bankDetails.accountHolder}
          onChange={handleChange}
          className="input-field"
        />
        <Input
          placeholder="Bank Name"
          name="bankName"
          value={bankDetails.bankName}
          onChange={handleChange}
          className="input-field"
        />
        <Input
          placeholder="Account Number"
          name="accountNumber"
          value={bankDetails.accountNumber}
          onChange={handleChange}
          className="input-field"
        />
        <Input
          placeholder="IBAN Number"
          name="iban"
          value={bankDetails.iban}
          onChange={handleChange}
          className="input-field"
        />
        <Input
          placeholder="Swift Code"
          name="swiftCode"
          value={bankDetails.swiftCode}
          onChange={handleChange}
          className="input-field"
        />
      </Card>
      <Button className="submit-button" onClick={handleSubmission}>
        Submit
      </Button>
      <div className="status-container">
        {status === "Pending" ? (
          <span className="status pending">
            <ClockCircleOutlined /> Pending
          </span>
        ) : (
          <span className="status verified">
            <CheckCircleOutlined /> Verified
          </span>
        )}
      </div>
    </div>
  );
};

export default BankDetails;
