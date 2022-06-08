import express from 'express';
import { isAuth } from '../middleware/is-auth';
import * as UserController from '../controllers/user.controllers';
import { body } from 'express-validator';
import { isValidUser } from '../utils/validators';

const usersRouter = express.Router();

usersRouter.post("/login", UserController.getUser);

usersRouter.post(
	"/register",
	body('email').custom(isValidUser),
	body('password').trim().isLength({ min: 5 }),
	UserController.createUser
);

usersRouter.post("/logout", isAuth, UserController.logout);

export { usersRouter };
