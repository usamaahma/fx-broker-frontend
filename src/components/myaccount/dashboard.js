import React, { useEffect, useState } from "react";
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
import { account, depdraws } from "../../utils/axios";

const Dashboard = () => {
  const [depositTotal, setDepositTotal] = useState(0);
  const [withdrawTotal, setWithdrawTotal] = useState(0);
  const [liveAccounts, setLiveAccounts] = useState(0);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.id) {
          console.error("User ID not found in localStorage");
          return;
        }

        const userId = encodeURIComponent(user.id);

        // 🔹 Fetch deposits & withdrawals
        const depdrawsResponse = await depdraws
          .get(`/${userId}`)
          .catch((err) => {
            console.error("Deposits & Withdrawals API Error:", err);
            return { data: { deposit: [], withdraw: [] } };
          });

        const { deposit = [], withdraw = [] } = depdrawsResponse.data;

        const totalDeposit = deposit.reduce(
          (sum, item) => sum + (item.amount || 0),
          0
        );
        const totalWithdraw = withdraw.reduce(
          (sum, item) => sum + (item.amount || 0),
          0
        );

        setDepositTotal(totalDeposit);
        setWithdrawTotal(totalWithdraw);

        // 🔹 Handle Empty Graph (Show Flat Line if no data)
        const formattedChartData =
          deposit.length || withdraw.length
            ? deposit.map((item, index) => ({
                name: `Month ${index + 1}`,
                deposit: item.amount || 10, // Default value if 0
                withdraw: withdraw[index]?.amount || 5, // Default value if 0
              }))
            : [
                { name: "Jan", deposit: 10, withdraw: 5 },
                { name: "Feb", deposit: 15, withdraw: 7 },
                { name: "Mar", deposit: 20, withdraw: 8 },
              ]; // Default dataset for empty case ✅

        setChartData(formattedChartData);

        // 🔹 Fetch account details
        const accountResponse = await account.get(`/${userId}`).catch((err) => {
          console.error("Accounts API Error:", err);
          return { data: {} };
        });

        // Ensure data is an array
        const accountData = accountResponse.data;
        const accounts = Array.isArray(accountData)
          ? accountData
          : [accountData];

        // Filter verified real accounts
        const realAccounts = accounts.filter(
          (acc) =>
            acc.accountType?.toLowerCase() === "real" &&
            acc.status === "verified"
        ).length;

        console.log(realAccounts, "rree");
        setLiveAccounts(realAccounts);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="dashboard-container">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <Card className="dashboard-card gold-card">
            <Statistic
              title="Total Deposit"
              value={depositTotal}
              prefix={<DollarOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card className="dashboard-card red-card">
            <Statistic
              title="Total Withdrawal"
              value={withdrawTotal}
              prefix={<WalletOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card className="dashboard-card blue-card">
            <Statistic
              title="Live Accounts"
              value={liveAccounts}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <div className="chart-section">
        <h2 className="chart-title">Monthly Deposit/Withdrawal</h2>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={chartData}>
            <CartesianGrid stroke="rgba(255, 255, 255, 0.2)" />
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="deposit"
              stroke="#ffd700"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="withdraw"
              stroke="#ff4d4f"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
