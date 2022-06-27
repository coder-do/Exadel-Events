import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Descriptions, message, Space, Spin } from "antd";
import { AppContext } from "context/context";
import { axios_instance } from "utils/axios";
import { IEvent } from "interfaces/event";
import Map from "components/Map/Map";
import { logout } from "utils/authHelpers";
import "./style.sass";

const EventDetails: React.FC = () => {
	const { isLoggedIn, setIsLoggedIn } = useContext(AppContext);
	const [loading, setLoading] = useState<boolean>(true);
	const [event, setEvent] = useState<IEvent>();
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const params = useParams();

	useEffect(() => {
		const endpoint = searchParams.get("subscriber")
			? `events/my/${params.id}`
			: `events/${params.id}`;
		if (isLoggedIn) {
			axios_instance
				.get(endpoint)
				.then((res) => {
					setEvent(res.data.event);
					setLoading(false);
				})
				.catch((err) => {
					if (err.response.status === 401) {
						logout({ navigate, setIsLoggedIn, message });
					}
					message.error(err.message);
				});
		} else {
			navigate("/auth/login");
		}
	}, []);

	return (
		<>
			{loading && (
				<Space className="spacee">
					<Spin size="large" />
				</Space>
			)}
			{event && (
				<Descriptions title="Event details" bordered>
					<Descriptions.Item label="Name">
						{event.name}
					</Descriptions.Item>
					<Descriptions.Item label="Description">
						{event.description}
					</Descriptions.Item>
					<Descriptions.Item label="Start Date">
						{new Date(event.start_date).toDateString()}
					</Descriptions.Item>
					<Descriptions.Item label="End Date">
						{new Date(event.end_date).toDateString()}
					</Descriptions.Item>
					<Descriptions.Item label="Type">
						{event.type}
					</Descriptions.Item>
					{event.address && (
						<Descriptions.Item label="Address">
							{event.address}
						</Descriptions.Item>
					)}
				</Descriptions>
			)}
			{event?.address && <Map address={event?.address} />}
		</>
	);
};

export default EventDetails;
