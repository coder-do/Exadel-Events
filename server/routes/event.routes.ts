import express from 'express';
import * as EventController from '../controllers/event.controllers';
import { isAuth } from '../middleware/is-auth';
import { body } from 'express-validator';

const eventsRouter = express.Router();
const typeRegexp = /^(online|offline)$/;

eventsRouter.get("/", isAuth, EventController.getEvents);

eventsRouter.get("/my", isAuth, EventController.getUserEvents);

eventsRouter.get("/my/:userEventId", isAuth, EventController.getUserEvent);

eventsRouter.get("/:eventId", isAuth, EventController.getEvent);

eventsRouter.post(
	"/add",
	isAuth,
	body('name').trim().isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
	body('description').trim().isLength({ min: 5 }).withMessage('Description must be at least 5 characters long'),
	body('type').matches(typeRegexp).withMessage('Type must be online or offlne'),
	EventController.addEvent
);

eventsRouter.put(
	"/update",
	isAuth,
	body('name').trim().isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
	body('description').trim().isLength({ min: 5 }).withMessage('Description must be at least 5 characters long'),
	body('type').matches(typeRegexp).withMessage('Type must be online or offlne'),
	EventController.updateEvent
);

eventsRouter.delete("/delete/:eventId", isAuth, EventController.deleteEvent);

export { eventsRouter };
