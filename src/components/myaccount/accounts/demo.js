import React from "react";
import { Form, Input, Button, Card } from "antd";
import "./demo.css"; // Import the CSS file

function Demo() {
    const onFinish = (values) => {
        console.log("Form values:", values);
    };

    return (
        <div className="demo-container">
            <Card className="demo-card">
                <h2 className="demo-heading" >Request For a Demo Account</h2>
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
                        label="Amount"
                        name="amount"
                        rules={[{ required: true, message: "Please enter an amount!" }]}
                    >
                        <Input placeholder="Enter amount" type="number" />
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

export default Demo;
