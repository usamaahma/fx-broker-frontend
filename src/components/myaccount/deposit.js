import React, { useState, useEffect } from "react";
import { Button, Card, Upload, Image, Input, message } from "antd";
import {
  UploadOutlined,
  ClockCircleOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import axios from "axios";
import "./deposit.css";
import { deposit } from "../../utils/axios";
import { toast } from "react-toastify";

const Deposit = () => {
  const bankDetails = {
    TRC20: "TD2bTuQ98tKke2jMJkNYpvPK8sX5ewNkMK",
  };

  const [depositSlip, setDepositSlip] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [deposits, setDeposits] = useState([]);
  const [tradingAccountId, setTradingAccountId] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    fetchDeposits();
  }, []);

  const fetchDeposits = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    try {
      const response = await deposit.get(`/user/${user.id}`);
      setDeposits(response.data); // ✅ Direct assignment
    } catch (error) {
      console.error("Error fetching deposits:", error);
    }
  };
  const handleUpload = async (file) => {
    if (!file) {
      message.error("No file selected.");
      return false;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "jadeedskills");
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
    } finally {
      setUploading(false);
    }

    return false;
  };

  const handleSubmit = async () => {
    if (!depositSlip || !tradingAccountId || !amount) {
      message.error("Please fill in all fields and upload a deposit slip.");
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
        tradingAccountId,
        amount,
        status: 'pending',
      });

      if (response.status === 201) {
        toast.success("Deposit request submitted successfully!");
        setDepositSlip("");
        setTradingAccountId("");
        setAmount("");
        fetchDeposits(); // Refresh deposits list
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

      <Input
        placeholder="Enter Trading Account ID"
        className="deposit-input"
        value={tradingAccountId}
        onChange={(e) => setTradingAccountId(e.target.value)}
      />

      <Input
        placeholder="Enter Amount"
        type="number"
        className="deposit-input"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <Upload
        beforeUpload={(file) => {
          handleUpload(file);
          return false;
        }}
        showUploadList={false}
      >
        <Button
          icon={<UploadOutlined />}
          className="upload-button"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload Deposit Slip"}
        </Button>
      </Upload>

      {depositSlip && (
        <div className="uploaded-image-container">
          <Image
            src={depositSlip}
            alt="Deposit Slip"
            className="uploaded-image"
          />
          <Button
            type="primary"
            danger
            shape="circle"
            icon={<CloseOutlined />}
            className="delete-icon"
            onClick={() => setDepositSlip(null)}
          />
        </div>
      )}

      <Button
        className="submit-button"
        onClick={handleSubmit}
        disabled={!depositSlip || !tradingAccountId || !amount}
      >
        Submit
      </Button>

      <div className="deposit-history">
        <h3>Your Deposit History</h3>
        {deposits.length === 0 ? (
          <p>No deposit records found.</p>
        ) : (
          deposits.map((deposit, index) => (
            <Card key={index} className="deposit-history-card">
              <p><strong>Trading Account ID:</strong> {deposit.tradingAccountId}</p>
              <p><strong>Amount:</strong> ${deposit.amount}</p>
              <p><strong>Status:</strong>
                <span className={`status ${deposit.status}`}> {deposit.status}</span>
              </p>
              {deposit.image && (
                <Image
                  src={deposit.image}
                  alt="Deposit Slip"
                  width={200}
                  style={{ marginTop: '10px' }}
                />
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Deposit;
