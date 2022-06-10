import { Request, Response, NextFunction } from 'express';
import * as   UserService from '../services/user.services';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

export const getUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
	try {
		const { email, password } = req.body;
		const user = await UserService.getUser(req.body);
		if (!user) {
			return res.status(404).json({
				message: 'User not found. Please check your email and password.'
			});
		} else {
			const token = jwt.sign(
				{ email, password, role: user.role },
				process.env.JWT_SECRET as string,
				{ expiresIn: process.env.JWT_EXPIRES_IN }
			);
			(req.session as any).user = user;
			return req.session.save(() => {
				return res.status(200).json({
					message: 'Login completed',
					user,
					session: {
						...req.session,
						token: `Bearer ${token}`
					}
				});
			});
		}
	} catch (error: unknown) {
		return res.status(400).json({ error });
	}
}

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array()
			});
		}
		const password = await bcrypt.hash(req.body.password, 10);
		const user = await UserService.createUser({ ...req.body, password });
		return res.status(200).json(user);
	} catch (error: unknown) {
		return res.status(400).json(error);
	}
}

export const logout = async (req: Request, res: Response, next: NextFunction): Promise<Response<string, Record<string, null>> | undefined> => {
	try {
		req.session.destroy(() => {
			return res.status(200).json({
				message: 'Logout completed'
			});
		});
	} catch (error: unknown) {
		return res.status(400).json(error);
	}
}