import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import session from 'express-session';

import { usersRouter } from "./routes/user.routes";
import { eventsRouter } from "./routes/event.routes";

dotenv.config();

const app = express();
app.use(cors({
    origin: '*',
    preflightContinue: true,
    credentials: true
}));
// this also works
// app.use(cors({
//     origin: function (_, callback) {
//         return callback(null, true);
//     },
//     optionsSuccessStatus: 200,
//     credentials: true
// }))
app.use(session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: new Date(Date.now() + 3600000)
    }
}));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(path.resolve(), "public")));

app.use("/auth", usersRouter);

app.use("/events", eventsRouter);

mongoose.connect(process.env.MONGODB_URL as string)
    .then(() => {
        app.listen(process.env.PORT);
    })
    .catch((err: string) => new Error(err));

export default app;
