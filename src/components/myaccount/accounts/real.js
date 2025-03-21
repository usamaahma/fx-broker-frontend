import React from "react";
import { Form, Input, Button, Card } from "antd";
import "./real.css"; // Separate CSS file for styling

function Real() {
    const onFinish = (values) => {
        console.log("Form values:", values);
    };

    return (
        <div className="real-container">
            <Card className="real-card">
                <h2 className="real-heading">Request For a Real Account</h2>
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: "Please enter your name!" }]}
                    >
                        <Input placeholder="Enter your name" />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: "Please enter your email!" },
                            { type: "email", message: "Enter a valid email!" },
                        ]}
                    >
                        <Input placeholder="Enter your email" />
                    </Form.Item>

                    <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[
                            { required: true, message: "Please enter your phone number!" },
                        ]}
                    >
                        <Input placeholder="Enter your phone number" type="tel" />
                    </Form.Item>

                    <Form.Item
                        label="Country"
                        name="country"
                        rules={[{ required: true, message: "Please enter your country!" }]}
                    >
                        <Input placeholder="Enter your country" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="submit-btn">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}

export default Real;
