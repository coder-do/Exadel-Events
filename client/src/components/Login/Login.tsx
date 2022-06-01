import React from "react";
import { Form, Input, Button, Typography } from "antd";
import { Link } from "react-router-dom";
import "../Register/Register.sass";

const { Title, Text } = Typography;

const Login: React.FC = () => {
	const onFinish = (values: any) => {
		console.log("Success:", values);
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};

	return (
		<>
			<Title level={2} className="title">
				Log in
			</Title>
			<Form
				name="basic"
				className="form"
				labelCol={{ span: 6 }}
				wrapperCol={{ span: 14 }}
				initialValues={{ remember: true }}
				labelAlign="left"
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
			>
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
					rules={[
						{
							required: true,
							message: "Please input your password!",
						},
					]}
				>
					<Input.Password placeholder="••••••••" />
				</Form.Item>

				<Text className="text">
					Don't have an account?{" "}
					<Link to="/auth/register" className="link">
						Register
					</Link>
				</Text>

				<Form.Item wrapperCol={{ offset: 7, span: 10 }}>
					<Button type="primary" htmlType="submit" className="btn">
						Log in
					</Button>
				</Form.Item>
			</Form>
		</>
	);
};

export default Login;
