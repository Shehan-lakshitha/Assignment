import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";

const SignUp: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignUp = async (values: { username: string; password: string }) => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:5068/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                throw new Error("Sign-up failed");
            }

            message.success("Sign-up successful! Please sign in.");
            navigate("/signin");
        } catch (error) {
            message.error("Sign-up failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form layout="vertical" onFinish={handleSignUp}>
            <Form.Item
                name="username"
                label="Username"
                rules={[{ required: true, message: "Please enter your username" }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true, message: "Please enter your password" }]}
            >
                <Input.Password />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
                Sign Up
            </Button>
        </Form>
    );
};

export default SignUp;
