import React, { useState } from "react";
import { Button, Card, Upload, Image } from "antd";
import { UploadOutlined, ClockCircleOutlined } from "@ant-design/icons";
import "./deposit.css";

const Deposit = () => {
  const bankDetails = {
    // title: "Bank Title",
    // accountHolder: "John Doe",
    // accountNumber: "1234567890",
    TRC20: "TD2bTuQ98tKke2jMJkNYpvPK8sX5ewNkMK",
  };

  const [depositSlip, setDepositSlip] = useState(null);
  const [status, setStatus] = useState("Pending");

  const handleUpload = (info) => {
    const file = info.file;
    const reader = new FileReader();

    reader.onload = () => {
      setDepositSlip(reader.result);
    };

    reader.readAsDataURL(file);
    return false; // Prevent upload
  };

  const handleSubmit = () => {
    setStatus("Pending");
  };

  return (
    <div className="deposit-container">
      <h2 className="title">Deposit Funds</h2>
      <Card
        title="Account Details"
        bordered={false}
        className="deposit-card"
      >
        {/* <p>
          <strong>Bank:</strong> {bankDetails.title}
        </p>
        <p>
          <strong>Account Holder:</strong> {bankDetails.accountHolder}
        </p>
        <p>
          <strong>Account Number:</strong> {bankDetails.accountNumber}
        </p> */}
        <p className="accounttrc">
          <strong>TRC20:</strong>
           {bankDetails.TRC20}
        </p>
      </Card>

      <Upload beforeUpload={handleUpload} showUploadList={false}>
        <Button icon={<UploadOutlined />} className="upload-button">
          Upload Deposit Slip
        </Button>
      </Upload>

      {depositSlip && (
        <div className="uploaded-image-container">
          <Image
            src={depositSlip}
            alt="Deposit Slip"
            className="uploaded-image"
          />
          <p className="deposit-details">
            <strong>Bank:</strong> {bankDetails.title} |
            <strong> Account Holder:</strong> {bankDetails.accountHolder} |
            <strong> Account Number:</strong> {bankDetails.accountNumber} |
            <strong> IBAN:</strong> {bankDetails.iban}
          </p>
        </div>
      )}

      <Button className="submit-button" onClick={handleSubmit}>
        Submit
      </Button>
      <div className="status-container">
        <span className="status pending">
          <ClockCircleOutlined /> {status}
        </span>
      </div>
    </div>
  );
};

export default Deposit;
