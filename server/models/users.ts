import { Schema, model } from 'mongoose';

interface IUser {
	name: string;
}

const userSchema = new Schema<IUser>({
	name: String
})

export default model<IUser>('User', userSchema, 'users');