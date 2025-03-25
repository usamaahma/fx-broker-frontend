import React, { useState } from "react";
import { Button, Card, Upload, Image, message } from "antd";
import { UploadOutlined, ClockCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import "./deposit.css";
import { deposit } from "../../utils/axios";
import { toast } from "react-toastify";

const Deposit = () => {
  const bankDetails = {
    TRC20: "TD2bTuQ98tKke2jMJkNYpvPK8sX5ewNkMK",
  };

  const [depositSlip, setDepositSlip] = useState(null);
  const [status, setStatus] = useState("Pending");

  const handleUpload = async (file) => {
    if (!file) {
      message.error("No file selected.");
      return false;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "jadeedskills"); // Unsigned upload preset
    formData.append("folder", "deposits");

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dvm237msr/image/upload`,
        formData
      );

      if (response.data.secure_url) {
        setDepositSlip(response.data.secure_url);
        message.success("Image uploaded successfully!");
      } else {
        message.error("Upload failed, no secure URL received.");
      }
    } catch (error) {
      console.error("Upload failed:", error.response?.data || error);
      message.error("Image upload failed. Please check API credentials.");
    }

    return false;
  };

  const handleSubmit = async () => {
    if (!depositSlip) {
      message.error("Please upload a deposit slip first.");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      message.error("User not found. Please log in again.");
      return;
    }

    try {
      const response = await deposit.post("/", {
        user: user.id,
        image: depositSlip,
      });

      if (response.status === 201) {
        // Check if response status is 201
        toast.success("You will be notified by your email about your deposit!");
        setStatus("Submitted");
        setDepositSlip("");
      } else {
        message.error("Deposit submission failed!");
      }
    } catch (error) {
      console.error("Error submitting deposit:", error);
      message.error("Something went wrong. Try again.");
    }
  };

  return (
    <div className="deposit-container">
      <h2 className="title">Deposit Funds</h2>
      <Card
        title="Binance Account Details"
        bordered={false}
        className="deposit-card"
      >
        <p className="accounttrc">
          <strong>TRC20:</strong> {bankDetails.TRC20}
        </p>
      </Card>

      <Upload
        beforeUpload={(file) => {
          handleUpload(file);
          return false;
        }}
        showUploadList={false}
      >
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
