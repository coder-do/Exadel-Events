import { Schema, model } from 'mongoose';

export interface IEvent {
	name: string,
	description: string,
	start_date: Date,
	end_date: Date,
	type: 'online' | 'offline',
	address: string,
};

const eventSchema = new Schema<IEvent>({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	start_date: {
		type: Date,
		required: true
	},
	end_date: {
		type: Date,
		required: true
	},
	type: {
		type: String,
		required: true
	},
	address: {
		type: String,
		required: false
	},
});

export default model<IEvent>('Event', eventSchema, 'events');