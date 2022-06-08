import { body, CustomValidator } from 'express-validator';
import { IUser } from 'interfaces/user.interfaces';
import User from '../models/user.models';

export const isValidUser: CustomValidator = (value: string): Promise<string | undefined> => {
	return User.find({ email: value }).then((user => {
		if (user.length > 0) {
			return Promise.reject('E-mail already in use! Please, choose another one.');
		}
	}));
};