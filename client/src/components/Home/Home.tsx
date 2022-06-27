import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, message, Pagination } from "antd";
import Event from "components/Event/Event";
import { AppContext } from "context/context";
import { axios_instance } from "utils/axios";
import { IEvent } from "interfaces/event";
import { Helpers } from "./Helpers";
import { logout } from "utils/authHelpers";
import "./style.sass";

const Home: React.FC = () => {
	const navigate = useNavigate();
	const { isLoggedIn, setIsLoggedIn } = useContext(AppContext);
	const [events, setEvents] = useState<IEvent[]>([]);
	const [subscribedEvents, setSubscribedEvents] = useState<IEvent[]>([]);
	const [updateEvents, setUpdateEvents] = useState<boolean>(false);
	const [minValue, setMinValue] = useState<number>(0);
	const [maxValue, setMaxValue] = useState<number>(1);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [loading, setLoading] = useState<boolean>(true);
	const role = localStorage.getItem("role") === "admin";
	const itemsPerpage = 6;

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
						logout({ navigate, setIsLoggedIn, message });
					}
					message.error(err.message);
				});
			getUserEvents();
		} else {
			setLoading(false);
			setIsLoggedIn(false);
		}
	};

	const getUserEvents = () => {
		axios_instance
			.get("events/my")
			.then((res) => {
				setSubscribedEvents(res.data.events.events);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const subscribeEventHandler = (event: IEvent) => {
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
		handleChange(1);
	}, [isLoggedIn]);

	useEffect(() => {
		updateEvents && getEvents();
	}, [updateEvents]);

	const handleChange = (page: number) => {
		setMinValue((page - 1) * itemsPerpage);
		setMaxValue(page * itemsPerpage);
		setCurrentPage(page);
		isLoggedIn && getUserEvents();
	};

	return (
		<>
			{!isLoggedIn && <Helpers.MainTiTle />}
			{role && <Helpers.AdminTitle />}
			{isLoggedIn && (
				<>
					<Helpers.EventsTitle
						role={role}
						loading={loading}
						events={events}
					/>
					{loading && <Helpers.Spinner />}
					<Row>
						{events.length > 0 &&
							events
								.slice(minValue, maxValue)
								.map((event: IEvent) => (
									<Event
										key={event._id}
										event={event}
										updateEvent={setUpdateEvents}
										subscribed={
											subscribedEvents.length > 0 &&
											subscribedEvents.some((e) => {
												return (
													e._id?.toString() ===
													event._id?.toString()
												);
											})
										}
										subscribeEventhandler={
											subscribeEventHandler
										}
									/>
								))}
					</Row>
					<Pagination
						responsive
						className="pagination"
						onChange={handleChange}
						current={currentPage}
						total={events && events.length}
						pageSize={itemsPerpage}
					/>
				</>
			)}
		</>
	);
};

export default Home;
