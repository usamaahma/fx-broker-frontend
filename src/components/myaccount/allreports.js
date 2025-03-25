import React, { useEffect, useState } from "react";
import { Card, List, Tag } from "antd";
import "./allreports.css";
import { deposit, withdraw } from "../../utils/axios";

const Allreports = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Local storage se user ID lena
  const userId = JSON.parse(localStorage.getItem("user"))?.id;

  useEffect(() => {
    if (!userId) return;

    const fetchTransactions = async () => {
      try {
        // Dono APIs ko call karna
        const [depositRes, withdrawRes] = await Promise.all([
          deposit.get(`/${userId}`),
          withdraw.get(`/${userId}`)
        ]);

        // Transactions ko aik array mein merge karna
        const combinedData = [
          ...depositRes.data.map(item => ({ ...item, type: "Deposit" })),
          ...withdrawRes.data.map(item => ({ ...item, type: "Withdraw" }))
        ];

        // Date ke mutabiq sort karna (latest first)
        combinedData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setTransactions(combinedData);
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
          <List
            dataSource={transactions}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={`Amount: $${item.amount}`}
                  description={`Account: ${item.accountNumber} | Date: ${new Date(item.createdAt).toLocaleDateString()}`}
                />
                <Tag color={item.type === "Deposit" ? "green" : "red"}>
                  {item.type}
                </Tag>
              </List.Item>
            )}
          />
        )}
      </Card>
    </div>
  );
};

export default Allreports;
