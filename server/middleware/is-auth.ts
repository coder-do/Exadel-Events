import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req?.headers?.authorization?.split(" ")[1] as string;
		jwt.verify(
			token,
			process.env.JWT_SECRET as string
		);
		next();
	} catch (error) {
		res.status(401).json({ message: "Auth failed!" });
	}
};