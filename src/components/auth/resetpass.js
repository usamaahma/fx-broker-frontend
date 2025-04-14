import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // to extract token from URL
import { message, Input, Button, Row, Col, Space } from "antd"; // Ant Design components
import { resetpassword } from "../../utils/axios";
import "./resetpassword.css";
import { useLocation } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  //   const { resetPasswordToken } = useParams(); // Get token from URL
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const resetPasswordToken = searchParams.get("token");

  useEffect(() => {
    console.log(resetPasswordToken, "tokemr");
    if (!resetPasswordToken) {
      message.error("Invalid reset link");
    }
  }, [resetPasswordToken]);

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      message.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const response = await resetpassword.post("/", {
        resetPasswordToken, // Make sure this matches backend expectation
        newPassword: password,
      });
      message.success(response.data.message);
      // Optionally redirect to login page after success
    } catch (error) {
      console.log("Error response: ", error?.response?.data);
      message.error(
        error?.response?.data?.message ||
          "Failed to reset password. The link may have expired or is invalid."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-password-container">
      <Row
        justify="center"
        align="middle"
        style={{
          height: "60vh", // Make sure it's full screen height
          marginTop: "0", // No margin at the top, just center the content
        }}
      >
        <Col xs={24} sm={16} md={12} lg={8} xl={6}>
          <div
            style={{
              padding: "20px",
              border: "1px solid #ddd",
              borderRadius: "8px",
            }}
          >
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
              Reset Password
            </h2>

            {/* Input Fields */}
            <Space direction="vertical" style={{ width: "100%" }} size="large">
              <Input.Password
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Input.Password
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button
                type="primary"
                onClick={handleResetPassword}
                loading={loading}
                style={{ width: "100%" }}
              >
                {loading ? "Resetting..." : "Reset Password"}
              </Button>
            </Space>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ResetPassword;
