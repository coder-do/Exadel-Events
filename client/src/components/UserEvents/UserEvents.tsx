import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axios_instance } from "utils/axios";
import { message, Row, Space, Spin, Typography } from "antd";
import { AppContext } from "context/context";
import { IEvent } from "interfaces/event";
import Event from "components/Event/Event";
import "./style.sass";

const { Title, Text } = Typography;

const UserEvents: React.FC = () => {
	const navigate = useNavigate();
	const { isLoggedIn } = useContext(AppContext);
	const [events, setEvents] = useState<IEvent[]>([]);
	const [updateEvents, setUpdateEvents] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);

	const getEvents = () => {
		if (isLoggedIn) {
			axios_instance
				.get("events/my")
				.then((res) => {
					setEvents(res.data.events.events);
					setLoading(false);
				})
				.catch((err) => {
					if (err.response.status === 401) {
						localStorage.clear();
						message.error("Session expired. Please login again.");
						navigate("/auth/login");
					}
					message.error(err.message);
				});
		} else {
			navigate("/auth/login");
		}
	};

	const subscribeEventHandler = (event: IEvent) => {
		axios_instance
			.delete(`events/delete/${event._id}`)
			.then(() => {
				setUpdateEvents(!updateEvents);
				message.success("Successfully unsubscribed from event");
			})
			.catch((err) => {
				message.error(err.message);
			});
	};

	useEffect(() => {
		isLoggedIn && getEvents();
	}, [isLoggedIn, updateEvents]);

	return (
		<>
			{isLoggedIn && (
				<>
					<Title level={2} className="main_title">
						My Events
					</Title>
					{!loading && events.length === 0 && (
						<Text className="empty">
							There are no events yet. Subscribe to some events.
						</Text>
					)}
					{loading && (
						<Space className="space">
							<Spin size="large" />
						</Space>
					)}
					<Row>
						{events.length > 0 &&
							events.map((event: IEvent) => (
								<Event
									subscriber
									key={event._id}
									event={event}
									update={updateEvents}
									updateEvent={setUpdateEvents}
									subscribeEventhandler={
										subscribeEventHandler
									}
								/>
							))}
					</Row>
				</>
			)}
		</>
	);
};

export default UserEvents;
