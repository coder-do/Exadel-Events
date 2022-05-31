import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import indexRouter from "./routes/index";
import usersRouter from "./routes/users";
import User from './models/users';

dotenv.config();

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(path.resolve(), "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

mongoose.connect(process.env.MONGODB_URL as string)
	.then(async () => {
		const users = await User.find();
		console.log(users);
		app.listen(process.env.PORT);
	})
	.catch((err: string) => new Error(err));

export default app;
