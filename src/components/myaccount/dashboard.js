import React from "react";
import { Card, Col, Row, Statistic } from "antd";
import {
  DollarOutlined,
  WalletOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./dashboard.css";

const Dashboard = () => {
  const data = [
    { name: "Jan", deposit: 4000, withdraw: 2400 },
    { name: "Feb", deposit: 3000, withdraw: 1398 },
    { name: "Mar", deposit: 5000, withdraw: 4300 },
    { name: "Apr", deposit: 4780, withdraw: 2908 },
    { name: "May", deposit: 5890, withdraw: 4800 },
    { name: "Jun", deposit: 4390, withdraw: 3800 },
    { name: "Jul", deposit: 6490, withdraw: 4300 },
  ];

  return (
    <div className="dashboard-container">
      {/* TOP STATS SECTION */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card className="dashboard-card">
            <Statistic
              title="Total Deposit"
              value={25000}
              prefix={<DollarOutlined />}
              valueStyle={{ color: "#ffd700" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="dashboard-card">
            <Statistic
              title="Total Withdrawal"
              value={12000}
              prefix={<WalletOutlined />}
              valueStyle={{ color: "#ffd700" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="dashboard-card">
            <Statistic
              title="Demo Accounts"
              value={3}
              prefix={<UserOutlined />}
              valueStyle={{ color: "#ffd700" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="dashboard-card">
            <Statistic
              title="Live Accounts"
              value={2}
              prefix={<UserOutlined />}
              valueStyle={{ color: "#ffd700" }}
            />
          </Card>
        </Col>
      </Row>

      {/* CHART SECTION */}
      <div className="chart-section">
        <h2 className="chart-title">Monthly Deposit/Withdrawal</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid stroke="#444" />
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="deposit"
              stroke="#ffd700"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="withdraw"
              stroke="#ff4d4f"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
