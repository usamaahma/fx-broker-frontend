import React, { useState } from "react";
import {
  DashboardOutlined,
  FileDoneOutlined,
  BankOutlined,
  UserOutlined,
  WalletOutlined,
  FileTextOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Dropdown } from "antd";
import "./myaccount.css";
import Dashboard from "./dashboard";

const { Sider, Content } = Layout;

const MyAccount = () => {
  const [selectedOption, setSelectedOption] = useState("dashboard");

  const handleMenuClick = (option) => {
    setSelectedOption(option);
  };

  const menuItems = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: <DashboardOutlined />,
    },
    {
      key: "kyc",
      label: "KYC Verification",
      icon: <FileDoneOutlined />,
      children: [
        { key: "document-upload", label: "Document Upload" },
        { key: "bank-details", label: "Bank Details" },
      ],
    },
    {
      key: "my-account",
      label: "My Account",
      icon: <UserOutlined />,
      children: [
        { key: "open-demo", label: "Open Demo Account" },
        { key: "open-live", label: "Open Live Account" },
      ],
    },
    {
      key: "my-fund",
      label: "My Fund",
      icon: <WalletOutlined />,
      children: [
        { key: "deposit", label: "Deposit" },
        { key: "withdraw", label: "Withdraw" },
      ],
    },
    {
      key: "my-reports",
      label: "My Reports",
      icon: <FileTextOutlined />,
      children: [
        { key: "deposit-report", label: "Deposit Report" },
        { key: "withdraw-report", label: "Withdraw Report" },
      ],
    },
    {
      key: "helpdesk",
      label: "Helpdesk",
      icon: <QuestionCircleOutlined />,
    },
  ];

  const renderContent = () => {
    switch (selectedOption) {
      case "dashboard":
        return (
          <div className="content-section">
            {" "}
            <h1>Dashboard Content</h1>
            <Dashboard />
          </div>
        );
      case "document-upload":
        return (
          <div className="content-section">📂 Document Upload Content</div>
        );
      case "bank-details":
        return <div className="content-section">🏦 Bank Details Content</div>;
      case "open-demo":
        return (
          <div className="content-section">🆓 Open Demo Account Content</div>
        );
      case "open-live":
        return (
          <div className="content-section">💰 Open Live Account Content</div>
        );
      case "deposit":
        return <div className="content-section">💳 Deposit Content</div>;
      case "withdraw":
        return <div className="content-section">💸 Withdraw Content</div>;
      case "deposit-report":
        return <div className="content-section">📊 Deposit Report Content</div>;
      case "withdraw-report":
        return (
          <div className="content-section">📈 Withdraw Report Content</div>
        );
      case "helpdesk":
        return <div className="content-section">❓ Helpdesk Content</div>;
      default:
        return <div className="content-section">🏠 Dashboard Content</div>;
    }
  };

  return (
    <Layout className="my-account-layout">
      <Sider className="sidebar">
        <div className="logo">🚀 Fizmo Fx</div>
        <Menu
          theme="dark"
          mode="inline"
          onClick={({ key }) => handleMenuClick(key)}
          defaultSelectedKeys={["dashboard"]}
        >
          {menuItems.map((item) =>
            item.children ? (
              <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
                {item.children.map((subItem) => (
                  <Menu.Item key={subItem.key}>{subItem.label}</Menu.Item>
                ))}
              </Menu.SubMenu>
            ) : (
              <Menu.Item key={item.key} icon={item.icon}>
                {item.label}
              </Menu.Item>
            )
          )}
        </Menu>
      </Sider>
      <Layout>
        <Content className="content">{renderContent()}</Content>
      </Layout>
    </Layout>
  );
};

export default MyAccount;
