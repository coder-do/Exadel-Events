import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Col, Dropdown, Menu, message, Popconfirm } from "antd";
import { axios_instance } from "utils/axios";
import { IEvent } from "interfaces/event";
import "./style.sass";
import moment from "moment";

const { Meta } = Card;

interface IEventProps {
	event: IEvent;
	update: boolean;
	updateEvent: (value: boolean) => void;
	subscribeEventhandler: (event: IEvent) => void;
	subscribed?: boolean;
	subscriber?: boolean;
}

const Event: React.FC<IEventProps> = ({
	event,
	update,
	updateEvent,
	subscriber,
	subscribed,
	subscribeEventhandler,
}): JSX.Element => {
	const navigate = useNavigate();
	const role = localStorage.getItem("role") === "admin";
	const [sub, setSub] = useState<boolean>(subscribed || false);

	const confirm = (e: React.MouseEvent<HTMLElement> | undefined) => {
		e?.preventDefault();
		axios_instance
			.delete(`events/delete/${event._id}`)
			.then(() => {
				updateEvent(true);
				message.success("Event deleted");
			})
			.catch((err) => {
				message.error(err.message);
			});
	};

	const menu = (
		<Menu
			items={[
				{
					label: (
						<span
							onClick={() =>
								navigate("/events/update/" + event._id)
							}
						>
							Edit
						</span>
					),
					key: "9",
				},
				{
					label: (
						<Popconfirm
							title="Are you sure you want delete this event?"
							onConfirm={confirm}
							onCancel={() => {}}
							okText="Yes"
							cancelText="No"
						>
							<span>Delete</span>
						</Popconfirm>
					),
					key: "10",
				},
			]}
		/>
	);

	return (
		<Col span={4} offset={3}>
			<Card
				key={event._id}
				className="event_card"
				size="default"
				hoverable
				actions={[
					<Link
						to={`/events/details/${event._id}${
							subscriber ? "?subscriber=true" : ""
						}`}
					>
						<Button type="primary">Details</Button>
					</Link>,
					<Button
						type="primary"
						danger={subscriber}
						disabled={
							role ||
							sub ||
							subscribed ||
							moment(event.start_date).isBefore(moment())
						}
						onClick={() => {
							subscribeEventhandler(event!);
							setSub(true);
						}}
					>
						{moment(event.start_date).isBefore(moment())
							? "Event Expired"
							: sub || subscribed
							? "Subscribed"
							: subscriber
							? "Unsubscribe"
							: "Subscribe"}
					</Button>,
					<Dropdown
						overlay={menu}
						placement="bottomRight"
						trigger={["click"]}
						disabled={!role}
					>
						<Button type="primary">More</Button>
					</Dropdown>,
				]}
			>
				<Meta title={event.name} description={event.description} />
			</Card>
		</Col>
	);
};

export default Event;
