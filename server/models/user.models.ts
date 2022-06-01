import { Schema, model } from 'mongoose';
import Event, { IEvent } from './event.models';

interface IUser {
	name: string,
	email: string,
	password: string,
	role: 'admin' | 'user',
	events: IEvent[],
};

const userSchema = new Schema<IUser>({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	role: {
		type: String,
		required: true
	},
	events: [Event.schema],
});

export default model<IUser>('User', userSchema, 'users');