import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Row, Spin, Space, message, Typography } from "antd";
import Event from "components/Event/Event";
import { AppContext } from "context/context";
import { axios_instance } from "utils/axios";
import { IEvent } from "interfaces/event";
import "./style.sass";

const { Title, Text } = Typography;

const Home: React.FC = () => {
	const navigate = useNavigate();
	const { isLoggedIn } = useContext(AppContext);
	const [events, setEvents] = useState<IEvent[]>([]);
	const [updateEvents, setUpdateEvents] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);
	const role = localStorage.getItem("role") === "admin";

	const getEvents = () => {
		if (isLoggedIn) {
			axios_instance
				.get("events")
				.then((res) => {
					setEvents(res.data.events);
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
		console.log("Subscribe event", event);
		axios_instance
			.post("events/add", event)
			.then(() => {
				message.success("Successfully subscribed to event");
			})
			.catch((err) => {
				message.error(err.response.data);
			});
	};

	useEffect(() => {
		isLoggedIn && getEvents();
	}, []);

	useEffect(() => {
		getEvents();
	}, [updateEvents]);

	return (
		<>
			{!isLoggedIn && (
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
			)}
			{role && (
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
			)}
			{isLoggedIn && (
				<>
					<Title level={2} className="main_title">
						{role ? "All" : "Exadel"} Events
					</Title>
					{!loading && events.length === 0 && (
						<Text className="empty">
							There are no events yet...
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

export default Home;
