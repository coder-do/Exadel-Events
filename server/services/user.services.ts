import bcrypt from 'bcrypt';
import User from '../models/user.models';
import { IUser } from 'interfaces/user.interfaces';

export const getUser = async ({ email, password }: { email: string, password: string })
	: Promise<IUser | null> => {
	try {
		const user = await User.find({ email });
		if (!user || !bcrypt.compareSync(password, user[0].password)) {
			return null;
		} else {
			return user[0];
		}
	} catch (error: unknown) {
		return null;
	}
}

export const findUser = async ({ email }: { email: string }): Promise<IUser | null> => {
	try {
		const user = await User.find({ email });
		return user[0];
	} catch (error: unknown) {
		throw error;
	}
}

export const createUser = async (user: IUser): Promise<IUser> => {
	try {
		const newUser = await User.create(user);
		return newUser;
	} catch (error: unknown) {
		throw error;
	}
}