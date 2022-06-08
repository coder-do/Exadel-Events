import { Schema, model } from 'mongoose';
import { IEvent } from 'interfaces/event.interfaces';

const eventSchema = new Schema<IEvent>({
	name: {
		type: String
	},
	description: {
		type: String
	},
	start_date: {
		type: Date
	},
	end_date: {
		type: Date
	},
	type: {
		type: String
	},
	address: {
		type: String
	},
});

export default model<IEvent>('Event', eventSchema, 'events');