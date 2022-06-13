import React, { useContext, useEffect } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { axios_instance } from "utils/axios";
import { AppContext } from "context/context";
import "components/Register/style.sass";

const { Title, Text } = Typography;

const Login: React.FC = () => {
	const navigate = useNavigate();
	const { isLoggedIn, setIsLoggedIn } = useContext(AppContext);

	const checkAuthState = () => {
		if (isLoggedIn) {
			navigate("/");
		}
	};

	useEffect(checkAuthState, [isLoggedIn]);

	const onFinish = (values: { email: string; password: string }) => {
		axios_instance
			.post("auth/login", values)
			.then((res) => {
				localStorage.setItem("token", res.data.session.token);
				localStorage.setItem("username", res.data.session.user.name);
				localStorage.setItem("role", res.data.session.user.role);
				localStorage.setItem(
					"expiresIn",
					res.data.session.cookie.expires
				);
				setIsLoggedIn(true);
				navigate("/");
			})
			.catch((err) => {
				message.error(err.response.data.message);
			});
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
