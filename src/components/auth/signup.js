import React, { useState, useEffect } from "react";
import { Form, Input, Button, Card, Typography, Select, message } from "antd";
import { useNavigate } from "react-router-dom";
import { register } from "../../utils/axios"; // API call
import { useAuth } from "../contextapi/authcontext"; // Use Auth Context
import countryList from "react-select-country-list"; // Import Country List
import { ToastContainer, toast } from "react-toastify";
import "./signup.css"; // Import CSS file

const { Title, Text } = Typography;
const { Option } = Select;

const SignupPage = () => {
  const navigate = useNavigate();
  const { loginUser } = useAuth(); // Get loginUser from context
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]); // Country list
  const [selectedCountry, setSelectedCountry] = useState(""); // Selected country
  const [phoneCode, setPhoneCode] = useState(""); // Country Phone Code

  // Load Country Data on Component Mount
  useEffect(() => {
    const countryOptions = countryList().getData();
    setCountries(countryOptions);
  }, []);

  // Handle Country Change
  const handleCountryChange = (value) => {
    const selected = countries.find((c) => c.value === value);
    setSelectedCountry(selected.label); // Store country name
    setPhoneCode(getCountryPhoneCode(value)); // Update Phone Code
  };

  // Function to get country phone code based on country value
  const getCountryPhoneCode = (countryCode) => {
    const phoneCodes = {
      US: "+1",
      GB: "+44",
      PK: "+92",
      IN: "+91",
      CA: "+1",
      AU: "+61",
      FR: "+33",
      DE: "+49",
      AE: "+971",
      SA: "+966",
      CN: "+86",
      // Add more countries as needed
    };
    return phoneCodes[countryCode] || "+";
  };

  const onFinish = async (values) => {
    console.log("clicked");

    try {
      setLoading(true);
      const response = await register.post("/register", {
        ...values,
        country: selectedCountry,
      });
      loginUser(response.data.token);
      toast.success("Signup successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <Card className="signup-card">
        <Title level={2} className="signup-title">
          Sign Up
        </Title>
        <Form layout="vertical" onFinish={onFinish}>
          {/* Name */}
          <Form.Item
            label={<Text className="signup-label">Name</Text>}
            name="name"
            rules={[{ required: true, message: "Please enter your name!" }]}
          >
            <Input placeholder="Enter your name" className="signup-input" />
          </Form.Item>

          {/* Email */}
          <Form.Item
            label={<Text className="signup-label">Email</Text>}
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Enter a valid email!",
              },
            ]}
          >
            <Input placeholder="Enter your email" className="signup-input" />
          </Form.Item>

          {/* Password */}
          <Form.Item
            label={<Text className="signup-label">Password</Text>}
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password
              placeholder="Enter your password"
              className="signup-input"
            />
          </Form.Item>

          {/* Country Dropdown */}
          <Form.Item
            label={<Text className="signup-label">Country</Text>}
            name="country"
            rules={[{ required: true, message: "Please select your country!" }]}
          >
            <Select
              placeholder="Select your country"
              onChange={handleCountryChange}
            >
              {countries.map((country) => (
                <Option key={country.value} value={country.value}>
                  {country.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Phone Number with Auto-Updating Country Code */}
          <Form.Item
            label={<Text className="signup-label">Phone Number</Text>}
            name="phoneNumber"
            rules={[
              { required: true, message: "Please enter your phone number!" },
            ]}
          >
            <Input
              addonBefore={phoneCode}
              placeholder="Enter your phone number"
              className="signup-input"
            />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="signup-button"
              loading={loading}
            >
              Sign Up
            </Button>
          </Form.Item>
        </Form>

        {/* Login Link */}
        <div className="login-text">
          <Text>
            {" "}
            <p style={{ color: "white" }}>Already have an account?</p>{" "}
            <span className="login-link" onClick={() => navigate("/login")}>
              Login
            </span>
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default SignupPage;
