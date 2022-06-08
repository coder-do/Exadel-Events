import { Request, Response, NextFunction } from 'express';
import * as EventService from '../services/event.services';
import { IUser } from 'interfaces/user.interfaces';
import { validationResult } from 'express-validator';

export const getEvents = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
	try {
		const events = await EventService.getEvents((req.session as any).user._id);
		return res.status(200).json({
			events
		});
	} catch (error: unknown) {
		return res.status(400).json({
			error: (req as any).session
		});
	}
}

export const addEvent = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array()
			});
		}
		const event = await EventService.addEvent((req.session as any).user._id, req.body);
		return res.status(200).json({
			message: 'Event added',
			event
		});
	} catch (error: unknown) {
		return res.status(400).json(error);
	}
}

export const updateEvent = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
	try {
		const event = await EventService.updateEvent((req.session as any).user._id, req.body);
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
		const event = await EventService.deleteEvent((req.session as any).user._id, req.params.eventId);
		return res.status(200).json({
			message: 'Event deleted',
			event
		});
	} catch (error: unknown) {
		return res.status(400).json(error);
	}
}