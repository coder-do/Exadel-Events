import { useState } from "react";
import {
	Form,
	Input,
	Button,
	Select,
	DatePicker,
	Typography,
	message,
} from "antd";
import { useNavigate } from "react-router-dom";
import { axios_instance } from "utils/axios";
import { IEvent } from "interfaces/event";
import Map from "components/Map/Map";
import "./style.sass";

const { TextArea } = Input;
const { Title } = Typography;

const AddEvent = () => {
	const [form] = Form.useForm();
	const navigate = useNavigate();
	const [type, setType] = useState<string>("");
	const [address, setAddress] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);

	const onSubmit = (values: any) => {
		setLoading(true);
		addEvent(values);
	};

	const addEvent = (data: IEvent) => {
		try {
			const finalData: IEvent = {
				name: data.name,
				description: data.description,
				start_date: (data.start_date as any)._d.toISOString(),
				end_date: (data.end_date as any)._d.toISOString(),
				type: type,
			};
			if (data.address && type === "offline") {
				finalData.address = address;
			}

			axios_instance
				.post("events/add", finalData)
				.then((res) => {
					message.success("Event added successfully");
					setLoading(false);
					form.resetFields();
					navigate("/");
				})
				.catch((err) => {
					message.error(err.response.data.errors[0].msg);
					setLoading(false);
				});
		} catch (err) {
			message.error("Please fill all required fields");
			setLoading(false);
		}
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
				<Form.Item
					name="address"
					label="Address"
					initialValue={address}
				>
					<Input
						disabled={type === "online"}
						placeholder="address"
						value={address}
					/>
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
			{type === "offline" && (
				<Map address={address} setAddress={setAddress} form={form} />
			)}
		</>
	);
};

export default AddEvent;
