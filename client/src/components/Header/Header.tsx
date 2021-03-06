import React, { memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout, Menu, Avatar, Dropdown, Typography, message } from "antd";
import { IMenuItem, menuItems } from "./config";
import { AppContext } from "context/context";
import { UserOutlined } from "@ant-design/icons";
import { logout } from "utils/authHelpers";
import "./style.sass";

const { Header } = Layout;
const { Text } = Typography;

const MainHeader: React.FC = () => {
	const { isLoggedIn, setIsLoggedIn } = React.useContext(AppContext);
	const navigate = useNavigate();

	const menu = (
		<Menu
			items={[
				{
					label: (
						<span
							onClick={() =>
								logout({ navigate, setIsLoggedIn, message })
							}
						>
							Log out
						</span>
					),
					key: "7",
				},
			]}
		/>
	);

	return (
		<Layout className="layout">
			<Header>
				<Menu theme="dark" mode="horizontal">
					{menuItems.map((item: IMenuItem) => (
						<Menu.Item
							key={item.key}
							icon={item.icon}
							className={item.label === "Log in" ? "login" : ""}
							hidden={item.canBeHidden && isLoggedIn}
						>
							<Link to={item.link}>{item.label}</Link>
						</Menu.Item>
					))}
					{isLoggedIn && (
						<>
							<Menu.Item
								hidden={
									localStorage.getItem("role") !== "admin"
								}
								key="fwe"
								className="menu_item"
							>
								<Link to="events/add">Add event</Link>
							</Menu.Item>
							<Menu.Item
								hidden={
									localStorage.getItem("role") === "admin"
								}
								key="fwg"
								className="menu_item"
							>
								<Link to="events/my">My Events</Link>
							</Menu.Item>
							<Menu.Item key="dsfds" className="menu_item">
								<Dropdown
									overlay={menu}
									placement="bottomRight"
								>
									<a onClick={(e) => e.preventDefault()}>
										<Text className="username">
											{localStorage.getItem("username")}
										</Text>
										<Avatar
											size="large"
											className="avatar"
											icon={<UserOutlined />}
										/>
									</a>
								</Dropdown>
							</Menu.Item>
						</>
					)}
				</Menu>
			</Header>
		</Layout>
	);
};

export default memo(MainHeader);
