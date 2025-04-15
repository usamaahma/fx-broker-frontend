import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { message, Input, Button, Row, Col, Space } from "antd";
import { resetpassword } from "../../utils/axios";
import "./resetpassword.css";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const resetPasswordToken = searchParams.get("token");

  const navigate = useNavigate();

  useEffect(() => {
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
      await resetpassword.post("/", {
        resetPasswordToken,
        newPassword: password,
      });
      setPassword("");
      setConfirmPassword("");
      toast.success("Password reset successfully! Please login.");
      navigate("/login");
    } catch (error) {
      const errorMessage =
        error.response?.status === 404
          ? "Email not found. Please check the reset link or try again."
          : error.response?.data?.message ||
            (error.response?.status === 401
              ? "The reset link is invalid or has expired."
              : "Failed to reset password. Please try again.");

      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-container">
      <Row justify="center" align="middle" className="reset-row">
        <Col xs={24} sm={20} md={16} lg={10} xl={6}>
          <div className="reset-card">
            <h2 className="reset-title">Reset Password</h2>
            <Space direction="vertical" style={{ width: "100%" }} size="large">
              <Input.Password
                placeholder="Enter new password"
                className="reset-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Input.Password
                placeholder="Confirm new password"
                className="reset-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button
                type="primary"
                className="reset-button"
                loading={loading}
                onClick={handleResetPassword}
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
