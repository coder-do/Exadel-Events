import React from "react";
import { Link } from "react-router-dom";
import { Space, Spin, Typography } from "antd";
import { IEvent } from "interfaces/event";

const { Text, Title } = Typography;

interface EventsTitleProps {
	role: boolean;
	loading: boolean;
	events: IEvent[];
}

export const Helpers = {
	MainTiTle: () => (
		<>
			<Text className="home_title">
				First, you need to{" "}
				<Text keyboard>
					<Link to="/auth/login" className="link">
						log in
					</Link>
				</Text>
			</Text>
		</>
	),
	AdminTitle: () => (
		<>
			<Text className="home_title">
				Hello, admin! You can add new events here:
				<Text keyboard>
					<Link to="/events/add" className="link">
						Add event
					</Link>
				</Text>
			</Text>
		</>
	),
	EventsTitle: ({ role, loading, events }: EventsTitleProps) => (
		<>
			<Title level={2} className="main_title">
				{role ? "All" : "Exadel"} Events
			</Title>
			{!loading && events.length === 0 && (
				<Text className="empty">There are no events yet...</Text>
			)}
		</>
	),
	Spinner: () => (
		<>
			<Space className="space">
				<Spin size="large" />
			</Space>
		</>
	),
};
