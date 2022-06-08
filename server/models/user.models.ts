import { Schema, model } from 'mongoose';
import Event from './event.models';
import { IUser } from 'interfaces/user.interfaces';

const userSchema = new Schema<IUser>({
	name: {
		type: String
	},
	email: {
		type: String
	},
	password: {
		type: String
	},
	role: {
		type: String
	},
	events: [Event.schema],
});

export default model<IUser>('User', userSchema, 'users');