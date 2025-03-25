import React, { useState } from "react";
import { Button, Card, Upload, Image, message } from "antd";
import {
  UploadOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import axios from "axios";
import "./document.css";
import { kyc } from "../../utils/axios";

const DocumentUploader = () => {
  const [poiImages, setPoiImages] = useState([]);
  const [status, setStatus] = useState("Pending");

  const handleUpload = async (file) => {
    if (!file) {
      message.error("No file selected.");
      return false;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "jadeedskills"); // Unsigned upload preset
    formData.append("folder", "kyc_documents");

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dvm237msr/image/upload`,
        formData
      );

      if (response.data.secure_url) {
        setPoiImages((prev) => [...prev, response.data.secure_url]);
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

  const handleDelete = (index) => {
    setPoiImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmission = async () => {
    if (poiImages.length === 0) {
      message.error("Please upload proof of identity images.");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      message.error("User not found. Please log in again.");
      return;
    }

    try {
      const response = await kyc.post("/", {
        userId: user.id,
        proofOfIdentity: poiImages, // Sending Cloudinary URLs to backend
      });

      if (response.status === 201) {
        message.success("KYC documents submitted successfully!");
        setStatus("Pending");
        setPoiImages([]);
      } else {
        message.error("KYC submission failed.");
      }
    } catch (error) {
      console.error("Error submitting KYC:", error);
      message.error("Something went wrong. Try again.");
    }
  };

  return (
    <div className="document-uploader-container">
      <h2 className="title">Document Upload</h2>

      <Card
        title="Proof of Identity (CNIC Front & Back)"
        bordered={false}
        className="upload-card"
      >
        <Upload
          beforeUpload={(file) => {
            handleUpload(file);
            return false;
          }}
          multiple
          showUploadList={false}
        >
          <Button className="upload-button">
            <UploadOutlined /> Upload POI
          </Button>
        </Upload>
        <div className="image-preview">
          {poiImages.map((img, index) => (
            <div key={index} className="image-wrapper">
              <Image
                src={img}
                width={100}
                height={100}
                className="uploaded-image"
              />
              <Button
                type="text"
                icon={<DeleteOutlined />}
                className="delete-button"
                onClick={() => handleDelete(index)}
              />
            </div>
          ))}
        </div>
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

export default DocumentUploader;
