import React, { useState, useEffect } from "react";
import { Form, Input, Button, Card } from "antd";
import { users } from "../../utils/axios";
import { useAuth } from "../contextapi/authcontext";
import { toast } from "react-toastify";

const getUserFromLocalStorage = () => {
  const storedUser = localStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) : null;
};

function Editaccount() {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    const userData = getUserFromLocalStorage();
    if (userData) {
      setUser(userData);
      setEmail(userData.email || "");
    }
  }, []);

  const handleSubmit = async () => {
    try {
      const res = await users.patch(
        `/${user.id}`,
        { email },
        {
          headers: {
            Authorization: `Bearer ${token}`, // 👈 Use decrypted token here
          },
        }
      );
      const updatedUser = { ...user, email };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      toast.success("Email updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update email");
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="helpdesk-container">
      <Card title="Edit Account" className="helpdesk-card">
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Email">
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" className="helpdesk-btn">
              Update Email
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Editaccount;
