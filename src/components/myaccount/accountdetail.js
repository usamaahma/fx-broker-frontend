import React, { useEffect, useState } from "react";
import "./accountdetail.css";
import { account, kyc } from "../../utils/axios";

function Accoundetail() {
  const [accountData, setAccountData] = useState([]);
  const [accountNumber, setAccountNumber] = useState(null);

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user?.id) return;

        // 1. Get all accounts of the user
        const response = await account.get(`/user/${user.id}`);
        const realAccounts = response.data.filter(
          (acc) => acc.accountType === "real" && acc.status === "verified"
        );

        setAccountData(realAccounts); // Store all real verified accounts

        // 2. Get KYC info
        const kycRes = await kyc.get(`/${user.id}`);
        const kycInfo = kycRes.data;
        if (kycInfo.bankDetails?.accountNumber) {
          setAccountNumber(kycInfo.bankDetails.accountNumber);
        }

      } catch (error) {
        console.error("Error fetching account/KYC details:", error);
      }
    };

    fetchAccountDetails();
  }, []);

  return (
    <div className="account-container">
      <h2 className="account-heading">💼 Your Real Accounts</h2>
      {accountData && accountData.length > 0 ? (
        accountData.map((acc, index) => (
          <div className="account-card" key={index}>
            <hr />
            <p><strong>👤 Name:</strong> {acc.name}</p>
            <p><strong>📧 Email:</strong> {acc.email}</p>
            <p><strong>📱 Phone:</strong> {acc.phone}</p>
            <p><strong>🌍 Country:</strong> {acc.country}</p>
            <p><strong>✅ Status:</strong> {acc.status}</p>
            {accountNumber && (
              <p><strong>🏦 Bank Account #:</strong> {accountNumber}</p>
            )}
          </div>
        ))
      ) : (
        <p className="no-account">⚠️ No verified real accounts found</p>
      )}
    </div>
  );
}

export default Accoundetail;
