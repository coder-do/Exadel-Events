import React, { useEffect, useState } from "react";
import {
	Form,
	Input,
	Button,
	Select,
	DatePicker,
	Typography,
	message,
} from "antd";
import moment from "moment";
import { axios_instance } from "utils/axios";
import { IEvent } from "interfaces/event";
import { useParams } from "react-router-dom";

const { TextArea } = Input;
const { Title } = Typography;

const UpdateEvent = () => {
	const params = useParams();
	const [form] = Form.useForm();
	const [type, setType] = useState("");
	const [event, setEvent] = useState<IEvent>();
	const [loading, setLoading] = useState<boolean>(false);

	const setFormInitialValues = () => {
		form.setFieldsValue({
			name: event?.name,
			description: event?.description,
			type: event?.type,
			start_date: moment(event?.start_date),
			end_date: moment(event?.end_date),
			address: event?.address || "",
		});
	};

	const onSubmit = (values: any) => {
		setLoading(true);
		addEvent(values);
	};

	const addEvent = (data: IEvent) => {
		const finalData: IEvent = {
			_id: event?._id,
			name: data.name,
			description: data.description,
			start_date: (data.start_date as any)._d.toISOString(),
			end_date: (data.end_date as any)._d.toISOString(),
			type: data.type,
		};
		if (data.address) {
			finalData.address = data.address;
		}

		axios_instance
			.put("events/update", finalData)
			.then((res) => {
				message.success("Event updated successfully");
				setLoading(false);
			})
			.catch((err) => {
				message.error(err.message);
				setLoading(false);
			});
	};

	useEffect(() => {
		axios_instance
			.get(`events/${params.id}`)
			.then((res) => {
				setEvent(res.data.event);
				setFormInitialValues();
			})
			.catch((err) => {
				message.error(err.message);
			});
	}, []);

	useEffect(() => {
		setFormInitialValues();
	}, [event]);

	return (
		<>
			<Title level={2} className="title">
				Update Event
			</Title>
			<Form
				form={form}
				layout="horizontal"
				onFinish={onSubmit}
				wrapperCol={{ span: 6 }}
				labelCol={{ span: 9 }}
			>
				<Form.Item name="name" label="Name">
					<Input placeholder="name" />
				</Form.Item>
				<Form.Item name="description" label="Description">
					<TextArea rows={3} placeholder="description" />
				</Form.Item>
				<Form.Item name="type" label="Type">
					<Select onChange={(val) => setType(val)} placeholder="type">
						<Select.Option value="online">Online</Select.Option>
						<Select.Option value="offline">Offline</Select.Option>
					</Select>
				</Form.Item>
				<Form.Item name="start_date" label="Start Date">
					<DatePicker />
				</Form.Item>
				<Form.Item name="end_date" label="End Date">
					<DatePicker />
				</Form.Item>
				<Form.Item name="address" label="Address">
					<Input disabled={type === "online"} placeholder="address" />
				</Form.Item>
				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						loading={loading}
						className="submit_btn"
					>
						Add Event
					</Button>
				</Form.Item>
			</Form>
		</>
	);
};

export default UpdateEvent;
