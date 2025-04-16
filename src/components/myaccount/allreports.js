import React, { useEffect, useState } from "react";
import { Card, List, Tag } from "antd";
import "./allreports.css";
import { depdraws } from "../../utils/axios";

const Allreports = () => {
  const [depositTransactions, setDepositTransactions] = useState([]);
  const [withdrawTransactions, setWithdrawTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = JSON.parse(localStorage.getItem("user"))?.id;

  useEffect(() => {
    if (!userId) return;

    const fetchTransactions = async () => {
      try {
        const response = await depdraws.get(`/${userId}`);

        const allData = Array.isArray(response.data) ? response.data : [];

        const deposits = allData
          .filter((item) => item.deposit !== undefined)
          .map((item) => ({
            email: item.email,
            amount: item.deposit,
          }));

        const withdrawals = allData
          .filter((item) => item.withdraw !== undefined)
          .map((item) => ({
            email: item.email,
            amount: item.withdraw,
          }));

        setDepositTransactions(deposits);
        setWithdrawTransactions(withdrawals);
      } catch (error) {
        console.error("Error fetching transactions", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [userId]);

  return (
    <div className="reports-container">
      <Card className="reports-card" title="Transaction History">
        {loading ? (
          <p>Loading transactions...</p>
        ) : (
          <>
            {/* 🔹 Deposit Section */}
            <Card title="Deposits" className="transaction-section">
              <List
                dataSource={depositTransactions}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      title={`Amount: $${item.amount}`}
                      description={`Email: ${item.email}`}
                    />
                    <Tag color="green">Deposit</Tag>
                  </List.Item>
                )}
              />
            </Card>

            {/* 🔹 Withdraw Section */}
            <Card title="Withdrawals" className="transaction-section">
              <List
                dataSource={withdrawTransactions}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      title={`Amount: $${item.amount}`}
                      description={`Email: ${item.email}`}
                    />
                    <Tag color="red">Withdraw</Tag>
                  </List.Item>
                )}
              />
            </Card>
          </>
        )}
      </Card>
    </div>
  );
};

export default Allreports;
