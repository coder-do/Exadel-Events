import React from "react";
import { Layout, Menu } from "antd";
import HomeIcon from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import "./Header.sass";

const { Header } = Layout;

const MainHeader: React.FC = () => {
	const navigate = useNavigate();
	const menuItems = [
		{
			key: "0",
			icon: (
				<Link to="/">
					<img src={HomeIcon} width={150} />
				</Link>
			),
		},
		{
			key: "1",
			label: "Log in",
			onClick: () => {
				navigate("/auth/login");
			},
		},
		{
			key: "2",
			label: "Sign up",
			onClick: () => {
				navigate("/auth/register");
			},
		},
	];
	return (
		<Layout className="layout">
			<Header>
				<Menu theme="dark" mode="horizontal" items={menuItems} />
			</Header>
		</Layout>
	);
};

export default MainHeader;
