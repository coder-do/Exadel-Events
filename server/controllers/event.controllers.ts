import { Request, Response, NextFunction } from 'express';
import * as EventService from '../services/event.services';
import { IUser } from 'interfaces/user.interfaces';
import { validationResult } from 'express-validator';

export const getEvents = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
	try {
		const { user } = req.session as any;
		const events = await EventService.getEvents(user._id, user.role);
		return res.status(200).json({
			events
		});
	} catch (error: unknown) {
		return res.status(400).json(error);
	}
}

export const getUserEvents = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
	try {
		const { user } = req.session as any;
		const events = await EventService.userEvents(user._id);
		return res.status(200).json({
			events
		});
	} catch (error: unknown) {
		return res.status(400).json(error);
	}
}

export const getUserEvent = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
	try {
		const { user } = req.session as any;
		const { userEventId } = req.params;
		const event = await EventService.getUserEvent(user._id, userEventId);
		return res.status(200).json({
			event
		});
	} catch (error: unknown) {
		return res.status(400).json(error);
	}
}

export const getEvent = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
	try {
		const event = await EventService.getEvent((req.session as any).user._id, req.params.eventId);
		return res.status(200).json({
			event
		});
	} catch (error: unknown) {
		return res.status(400).json(error);
	}
}

export const addEvent = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
	try {
		const errors = validationResult(req);
		const { user } = req.session as any;
		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array()
			});
		}
		const event = await EventService.addEvent(user._id, req.body, user.role);
		return res.status(200).json({
			message: 'Event added',
			event
		});
	} catch (error: any) {
		return res.status(400).json(error);
	}
}

export const updateEvent = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
	try {
		const event = await EventService.updateEvent(req.body);
		return res.status(200).json({
			message: 'Event updated',
			event
		});
	} catch (error: unknown) {
		return res.status(400).json(error);
	}
}

export const deleteEvent = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
	try {
		const { user } = req.session as any;
		const event = await EventService.deleteEvent(user._id, req.params.eventId, user.role);
		return res.status(200).json({
			message: 'Event deleted',
			event
		});
	} catch (error: unknown) {
		return res.status(400).json(error);
	}
}