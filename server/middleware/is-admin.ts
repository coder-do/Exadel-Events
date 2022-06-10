import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req?.headers?.authorization?.split(" ")[1] as string;
		const decoded: any = jwt.verify(
			token,
			process.env.JWT_SECRET as string
		);
		if (decoded.role === 'admin') {
			next();
		} else {
			res.status(401).json({ message: "User can not access admin routes!" });
		}
	} catch (error) {
		res.status(401).json({ message: "Auth failed!" });
	}
}