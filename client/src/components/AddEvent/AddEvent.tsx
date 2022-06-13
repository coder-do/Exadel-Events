import React, { useState } from "react";
import {
	Form,
	Input,
	Button,
	Select,
	DatePicker,
	Typography,
	message,
} from "antd";
import { axios_instance } from "utils/axios";
import { IEvent } from "interfaces/event";

const { TextArea } = Input;
const { Title } = Typography;

const AddEvent = () => {
	const [form] = Form.useForm();
	const [type, setType] = useState("");
	const [loading, setLoading] = useState<boolean>(false);

	const onSubmit = (values: any) => {
		setLoading(true);
		addEvent(values);
	};

	const addEvent = (data: IEvent) => {
		const finalData: IEvent = {
			name: data.name,
			description: data.description,
			start_date: (data.start_date as any)._d.toISOString(),
			end_date: (data.end_date as any)._d.toISOString(),
			type: type,
		};
		if (data.address) {
			finalData.address = data.address;
		}

		axios_instance
			.post("events/add", finalData)
			.then((res) => {
				message.success("Event added successfully");
				setLoading(false);
				form.resetFields();
			})
			.catch((err) => {
				message.error(err.message);
				setLoading(false);
			});
	};

	return (
		<>
			<Title level={2} className="title">
				Add Event
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

export default AddEvent;
