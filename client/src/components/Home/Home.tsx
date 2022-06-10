import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Col, message, Row, Space, Spin, Typography } from "antd";
import { AppContext } from "context/context";
import "./Home.sass";
import { axios_instance } from "utils/axios";

const { Title, Text } = Typography;
const { Meta } = Card;

interface IEvent {
	_id: string;
	name: string;
	description: string;
	type: "online" | "offline";
	start_date: Date;
	end_date: Date;
}

const Home: React.FC = () => {
	const { isLoggedIn } = useContext(AppContext);
	const [events, setEvents] = useState<IEvent[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	const getEvents = () => {
		axios_instance
			.get("events")
			.then((res) => {
				setEvents(res.data.events.events);
				setLoading(false);
			})
			.catch((err) => {
				message.error(err.response.data.message);
			});
	};

	useEffect(() => {
		isLoggedIn && getEvents();
	}, [isLoggedIn]);

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
			{isLoggedIn && (
				<>
					<Title level={2} className="main_title">
						Exadel Events
					</Title>
					{loading && (
						<Space className="space">
							<Spin size="large" />
						</Space>
					)}
					<Row>
						{events.length > 0 &&
							events.map((event: IEvent) => (
								<Col key={event._id} span={4} offset={3}>
									<Card
										key={event._id}
										className="event_card"
										size="default"
										hoverable
										actions={[
											<Link to={`/events/${event._id}`}>
												<Button type="primary">
													More info
												</Button>
											</Link>,
										]}
									>
										<Meta
											title={event.name}
											description={event.description}
										/>
									</Card>
								</Col>
							))}
					</Row>
				</>
			)}
		</>
	);
};

export default Home;
