import React, { useState } from "react";
import { Button, Card, Upload, Image } from "antd";
import {
  UploadOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import "./document.css";

const DocumentUploader = () => {
  const [poiImages, setPoiImages] = useState([]);
  const [status, setStatus] = useState("Pending");

  const handleUpload = (file, setImages) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImages((prev) => [...prev, e.target.result]);
    };
    reader.readAsDataURL(file);
  };

  const handleDelete = (index, setImages) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmission = () => {
    setStatus("Pending");
    // Backend API call yahan handle hoga
  };

  return (
    <div className="document-uploader-container">
      <h2 className="title">Document Upload</h2>

      <div className="upload-sections">
        <Card
          title="Proof of Identity (CNIC Front & Back)"
          bordered={false}
          className="upload-card"
        >
          <Upload
            beforeUpload={(file) => {
              handleUpload(file, setPoiImages);
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
                  onClick={() => handleDelete(index, setPoiImages)}
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
    </div>
  );
};

export default DocumentUploader;
