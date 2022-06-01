import React from "react";
import { Form, Input, Button, Typography } from "antd";
import { Link } from "react-router-dom";
import "./Register.sass";

const { Title, Text } = Typography;

const Register: React.FC = () => {
	const onFinish = (values: any) => {
		console.log("Success:", values);
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};

	return (
		<>
			<Title level={2} className="title">
				Sign up
			</Title>
			<Form
				name="basic"
				className="form"
				labelCol={{ span: 7 }}
				wrapperCol={{ span: 14 }}
				labelAlign="left"
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
			>
				<Form.Item
					label="Username"
					name="username"
					rules={[
						{
							required: true,
							message: "Please input your username!",
						},
					]}
				>
					<Input placeholder="John Smith" />
				</Form.Item>

				<Form.Item
					label="Email"
					name="email"
					rules={[
						{
							required: true,
							type: "email",
							message: "Please input correct email!",
						},
					]}
				>
					<Input type="email" placeholder="example@example.com" />
				</Form.Item>

				<Form.Item
					label="Password"
					name="password"
					hasFeedback
					rules={[
						{
							required: true,
							message: "Please input your password!",
						},
						{
							min: 6,
							message: "Password must be at least 6 characters!",
						},
					]}
				>
					<Input.Password />
				</Form.Item>

				<Form.Item
					name="confirm"
					label="Confirm Password"
					dependencies={["password"]}
					hasFeedback
					rules={[
						{
							required: true,
							message: "Please confirm your password!",
						},
						({ getFieldValue }) => ({
							validator(_, value) {
								if (
									!value ||
									getFieldValue("password") === value
								) {
									return Promise.resolve();
								}
								return Promise.reject(
									new Error("Passwords are not the same!")
								);
							},
						}),
					]}
				>
					<Input.Password />
				</Form.Item>

				<Text className="text">
					Have an account?{" "}
					<Link to="/auth/login" className="link">
						Login
					</Link>
				</Text>

				<Form.Item wrapperCol={{ offset: 7, span: 10 }}>
					<Button type="primary" htmlType="submit" className="btn">
						Sign up
					</Button>
				</Form.Item>
			</Form>
		</>
	);
};

export default Register;
