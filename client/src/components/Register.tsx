import React from "react";
import { Form, Input, Button, Typography } from "antd";

const { Title } = Typography;

const Register: React.FC = () => {
	const onFinish = (values: any) => {
		console.log("Success:", values);
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};

	return (
		<>
			<Title
				level={2}
				style={{
					textAlign: "center",
					marginTop: "20px",
					marginBottom: "30px",
				}}
			>
				Register
			</Title>
			<Form
				name="basic"
				labelCol={{ span: 6 }}
				wrapperCol={{ span: 14 }}
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
				style={{ width: "500px", margin: "0 auto" }}
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
					<Input />
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
					<Input.Password />
				</Form.Item>

				<Form.Item wrapperCol={{ offset: 7, span: 10 }}>
					<Button
						type="primary"
						htmlType="submit"
						style={{ display: "block", margin: "0 auto" }}
					>
						Submit
					</Button>
				</Form.Item>
			</Form>
		</>
	);
};

export default Register;
