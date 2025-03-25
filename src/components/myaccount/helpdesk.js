import React from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import './helpdesk.css';
import { helpdesk } from '../../utils/axios';

const Helpdesk = () => {
    const [form] = Form.useForm(); // Create form instance

    const onFinish = async (values) => {
        try {
            await helpdesk.post('/', values);

            message.success('Your message has been sent successfully!');
            form.resetFields(); // Clear form on success
        } catch (error) {
            console.error('Helpdesk Error:', error);
            message.error(error.response?.data?.message || 'Failed to send message!');
        }
    };

    return (
        <div className="helpdesk-container">
            <Card className="helpdesk-card" title="Have a Query?">
                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Please enter your Email' },
                            { type: 'email', message: 'Enter a valid email' },
                        ]}
                    >
                        <Input placeholder="Enter your email" />
                    </Form.Item>

                    <Form.Item
                        label="Message"
                        name="message"
                        rules={[{ required: true, message: 'Please enter your message' }]}
                    >
                        <Input.TextArea placeholder="Enter your message" rows={4} />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="helpdesk-btn">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Helpdesk;
