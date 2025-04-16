import React, { useEffect, useState } from "react";
import "./accountdetail.css"; // Import the CSS file
import { account } from "../../utils/axios";

function Accoundetail() {
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user")); // Get user from localStorage
        const response = await account.get(`/user/${user.id}`); // API call
        const realaccount = response.data;

        // Check if accountType is "real" and status is "verified"
        if (
          realaccount.accountType === "real" &&
          realaccount.status === "verified"
        ) {
          setEmail(realaccount.email);
        }
      } catch (error) {
        console.error("Error fetching account details:", error);
      }
    };

    fetchAccountDetails();
  }, []);

  return (
    <div className="account-container">
      <h2 className="account-heading">💼 Your Real Account</h2>
      {email ? (
        <p className="email-text">
          ✅  Email: <strong>{email}</strong>
        </p>
      ) : (
        <p className="no-account">⚠️ No verified real account found</p>
      )}
    </div>
  );
}

export default Accoundetail;
