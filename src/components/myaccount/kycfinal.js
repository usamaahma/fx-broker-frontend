import React, { useState, useEffect } from "react";
import { Button, Card, Upload, Image, Input, Form, message } from "antd";
import {
  UploadOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { kyc } from "../../utils/axios";
import "./kycfinal.css";
import axios from "axios";

const KycFinal = () => {
  const [poiImages, setPoiImages] = useState([]);
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState("Pending");
  const [bankDetails, setBankDetails] = useState(null);
  const [form] = Form.useForm();

  const storedUser = localStorage.getItem("user");
  const userId = storedUser ? JSON.parse(storedUser)?.id : null;
  useEffect(() => {
    console.log(userId);
    if (userId) {
      fetchKYCDetails();
    }
  }, [userId]);

  const fetchKYCDetails = async () => {
    try {
      const response = await kyc.get(`/${userId}`);
      setBankDetails(response.data.bankDetails);
      setStatus(response.data.status);
      setImages(response.data.proofOfIdentity);
    } catch (error) {
      console.error("Error fetching KYC details:", error);
    }
  };

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "jadeedskills");
    formData.append("folder", "kyc_documents");

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dvm237msr/image/upload`,
        formData
      );
      if (response.data.secure_url) {
        setPoiImages((prev) => [...prev, response.data.secure_url]);
        message.success("Image uploaded successfully!");
      }
    } catch (error) {
      console.error("Upload failed:", error);
      message.error("Image upload failed.");
    }
    return false;
  };

  const handleSubmission = async (values) => {
    if (!userId) {
      message.error("User ID missing, unable to submit KYC.");
      return;
    }
    if (poiImages.length === 0) {
      message.error("Please upload proof of identity images.");
      return;
    }

    const payload = {
      userId,
      proofOfIdentity: poiImages,
      bankDetails: {
        accountHolder: values.accountHolder,
        bankName: values.bankName,
        accountNumber: values.accountNumber,
        ibanNumber: values.iban,
      },
    };

    try {
      await kyc.post("/", payload);
      message.success("KYC submitted successfully!");
      fetchKYCDetails();
    } catch (error) {
      console.error("Error submitting KYC:", error);
      message.error("Failed to submit KYC.");
    }
  };

  return (
    <div className="kyc-container">
      <Card title="KYC Verification" className="kyc-card">
        <Upload beforeUpload={handleUpload} multiple showUploadList={false}>
          <Button className="upload-button">
            <UploadOutlined /> Upload POI
          </Button>
        </Upload>
        <div className="image-preview">
          {poiImages.map((img, index) => (
            <div key={index} className="image-wrapper">
              <Image
                src={img}
                width={80}
                height={80}
                className="uploaded-image"
              />
              <Button
                type="text"
                icon={<DeleteOutlined />}
                className="delete-button"
                onClick={() =>
                  setPoiImages(poiImages.filter((_, i) => i !== index))
                }
              />
            </div>
          ))}
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmission}
          className="kyc-form"
        >
          <Form.Item
            name="accountHolder"
            label="Account Holder Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="bankName"
            label="Bank Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="accountNumber"
            label="Account Number"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="iban"
            label="IBAN Number"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit" className="submit-button">
            Submit
          </Button>
        </Form>
      </Card>

      {bankDetails && (
        <Card title="KYC Preview" className="kyc-preview-card">
          <p>
            <strong>Account Holder:</strong> {bankDetails.accountHolder}
          </p>
          <p>
            <strong>Bank Name:</strong> {bankDetails.bankName}
          </p>
          <p>
            <strong>Account Number:</strong> {bankDetails.accountNumber}
          </p>
          <p>
            <strong>IBAN Number:</strong> {bankDetails.ibanNumber}
          </p>
          <div className="image-preview">
            {images.map((img, index) => (
              <Image
                key={index}
                src={img}
                width={80}
                height={80}
                className="uploaded-image"
              />
            ))}
          </div>
          <p className="status-text">
            {status === "Pending" ? (
              <ClockCircleOutlined />
            ) : (
              <CheckCircleOutlined />
            )}{" "}
            {status}
          </p>
        </Card>
      )}
    </div>
  );
};

export default KycFinal;
