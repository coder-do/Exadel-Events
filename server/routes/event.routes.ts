import express from 'express';
import * as EventController from '../controllers/event.controllers';
import { isAuth } from '../middleware/is-auth';
import { isAdmin } from '../middleware/is-admin';
import { body } from 'express-validator';

const eventsRouter = express.Router();
const dateRegexp = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
const typeRegexp = /^(online|offline)$/;

eventsRouter.get("/", isAuth, EventController.getEvents);

eventsRouter.post(
	"/add",
	isAuth, isAdmin,
	body('name').trim().isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
	body('description').trim().isLength({ min: 5 }).withMessage('Description must be at least 5 characters long'),
	body('start_date').matches(dateRegexp).withMessage('Start date must be a valid date'),
	body('end_date').matches(dateRegexp).withMessage('End date must be a valid date'),
	body('type').matches(typeRegexp).withMessage('Type must be online or offlne'),
	EventController.addEvent
);

eventsRouter.put(
	"/update",
	isAuth, isAdmin,
	body('name').trim().isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
	body('description').trim().isLength({ min: 5 }).withMessage('Description must be at least 5 characters long'),
	body('start_date').matches(dateRegexp).withMessage('Start date must be a valid date'),
	body('end_date').matches(dateRegexp).withMessage('End date must be a valid date'),
	body('type').matches(typeRegexp).withMessage('Type must be online or offlne'),
	EventController.updateEvent
);

eventsRouter.delete("/delete/:eventId", isAuth, isAdmin, EventController.deleteEvent);

export { eventsRouter };
