import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Card, message, Table } from 'antd';
import { withdraw } from '../../utils/axios';
import { toast } from 'react-toastify';
import './withdraw.css';

const Withdraw = () => {
    const [form] = Form.useForm();
    const [withdrawRequests, setWithdrawRequests] = useState([]); // State to store withdrawal requests
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchWithdrawRequests = async () => {
        try {
            setLoading(true);
            setError(null);

            const user = JSON.parse(localStorage.getItem('user')); // Fetch user from local storage
            if (!user || !user.id) {
                message.error('User not found. Please log in again.');
                return;
            }

            const response = await withdraw.get(`/user/${user.id}`); // Fetch withdrawal requests for the user

            const data = Array.isArray(response.data) ? response.data : response.data ? [response.data] : [];
            setWithdrawRequests(data.filter(request => request.status !== 'verified')); // Only show non-verified requests

        } catch (err) {
            console.error('Withdraw fetch error:', err);
            if (err.response && err.response.status === 404) {
                setError('No withdrawal requests found.');
            } else {
                setError('Failed to fetch withdrawal requests. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWithdrawRequests();
    }, []); // Fetch the requests when the component mounts

    const onFinish = async (values) => {
        try {
            const user = JSON.parse(localStorage.getItem('user')); // Fetch user from local storage
            if (!user || !user.id) {
                message.error('User not found. Please log in again.');
                return;
            }

            const payload = {
                ...values,
                userId: user.id,
                status: 'pending',
            };

            await withdraw.post('/', payload);

            toast.success('Withdrawal request submitted successfully!');
            form.resetFields(); // Clear the form after success
            fetchWithdrawRequests(); // Fetch updated requests after submission
        } catch (error) {
            console.error('Withdraw Error:', error);
            message.error(error.response?.data?.message || 'Withdrawal request failed!');
        }
    };

    if (loading) return <div>Loading withdrawal requests...</div>;

    // Table columns definition
    const columns = [
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Account Name',
            dataIndex: 'accountName',
            key: 'accountName',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text) => {
                let statusColor = '';

                if (text === 'pending') {
                    statusColor = 'yellow';
                } else if (text === 'rejected') {
                    statusColor = 'red';
                }

                return (
                    <span style={{ color: statusColor }}>
                        {text}
                    </span>
                );
            },
        }
    ];

    return (
        <div className="withdraw-container">
            <Card className="withdraw-card" title="Withdraw Funds">
                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        label="Bank Account Number"
                        name="accountNumber"
                        rules={[{ required: true, message: 'Please enter your Account Number' }]} >
                        <Input placeholder="Jazzcash/Bank Acc No. etc" />
                    </Form.Item>

                    <Form.Item
                        label="Bank Account Name"
                        name="accountName"
                        rules={[{ required: true, message: 'Please enter your Account Name' }]} >
                        <Input placeholder="Enter Account Name" />
                    </Form.Item>

                    <Form.Item
                        label="Amount"
                        name="amount"
                        rules={[{ required: true, message: 'Please enter Amount' }]} >
                        <Input placeholder="Enter Amount" type="number" />
                    </Form.Item>

                    <Form.Item
                        label="Trading Account ID"
                        name="tradingAccountId"
                        rules={[{ required: true, message: 'Please enter Trading Account ID' }]} >
                        <Input placeholder="Enter Trading Account ID" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="withdraw-btn">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Card>

            {/* Withdrawal Requests List - Table */}
            <div className="withdraw-requests-container">
                <h3>Withdrawal Requests</h3>
                {error && <div className="error-message">{error}</div>}

                <Table
                    columns={columns}
                    dataSource={withdrawRequests}
                    rowKey="_id"
                    pagination={{ pageSize: 5 }}
                    scroll={{ x: 'max-content' }} // Ensures the table is scrollable horizontally
                />
            </div>
        </div>
    );
};

export default Withdraw;
