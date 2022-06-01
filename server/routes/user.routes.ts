import express, { NextFunction, Request, Response } from 'express';
const usersRouter = express.Router();

usersRouter.post("/login", function (req: Request, res: Response, next: NextFunction): void {
	res.json("login");
	next();
});

usersRouter.post("/register", function (req: Request, res: Response, next: NextFunction): void {
	res.json("register");
	next();
});

export { usersRouter };
