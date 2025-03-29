import React from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import './withdraw.css';
import { withdraw } from '../../utils/axios';
import { toast } from 'react-toastify';

const Withdraw = () => {
    const [form] = Form.useForm(); // Create a form instance

    const onFinish = async (values) => {
        try {
            const user = JSON.parse(localStorage.getItem('user')); // Fetch user from local storage
            if (!user || !user.id) {
                message.error('User not found. Please log in again.');
                return;
            }

            const payload = {
                ...values,
                userId: user.id, // Attach userId from local storage
            };

            await withdraw.post('/', payload);

            toast.success('Withdrawal request submitted successfully!');
            form.resetFields(); // Clear the form after success
        } catch (error) {
            console.error('Withdraw Error:', error);
            message.error(error.response?.data?.message || 'Withdrawal request failed!');
        }
    };

    return (
        <div className="withdraw-container">
            <Card className="withdraw-card" title="Withdraw Funds">
                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        label="Bank Account Number"
                        name="accountNumber"
                        rules={[{ required: true, message: 'Please enter your Account Number' }]}
                    >
                        <Input placeholder="Jazzcash/Bank Acc No. etc" />
                    </Form.Item>

                    <Form.Item
                        label="Bank Account Name"
                        name="accountName"
                        rules={[{ required: true, message: 'Please enter your Account Name' }]}
                    >
                        <Input placeholder="Enter Account Name" />
                    </Form.Item>

                    <Form.Item
                        label="Amount"
                        name="amount"
                        rules={[{ required: true, message: 'Please enter Amount' }]}
                    >
                        <Input placeholder="Enter Amount" type="number" />
                    </Form.Item>

                    <Form.Item
                        label="Trading Account ID"
                        name="tradingAccountId"
                        rules={[{ required: true, message: 'Please enter Trading Account ID' }]}
                    >
                        <Input placeholder="Enter Trading Account ID" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="withdraw-btn">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Withdraw;
