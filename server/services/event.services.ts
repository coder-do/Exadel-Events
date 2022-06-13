import User from '../models/user.models';
import Event from '../models/event.models';
import { IEvent } from 'interfaces/event.interfaces';
import { IUser } from 'interfaces/user.interfaces';

export const getEvents = async (userId: string, role: string): Promise<IEvent[] | IUser | null> => {
	try {
		const events = await Event.find();
		return events;
	} catch (error: unknown) {
		return null;
	}
}

export const userEvents = async (userId: string): Promise<IUser | null> => {
	try {
		const events = await User.findOne({ _id: userId }).select('events');
		return events;
	} catch (error: unknown) {
		return null;
	}
}

export const getEvent = async (userId: string, eventId: string): Promise<IEvent | null> => {
	try {
		const event = await Event.findOne({ _id: eventId });
		return event;
	} catch (error: unknown) {
		return null;
	}
}

export const getUserEvent = async (userId: string, eventId: string): Promise<IEvent | null> => {
	try {
		const event = await User.findOne({ _id: userId }).select('events').populate('events');
		return (event! as any).events.find((event: IEvent) => event?._id?.toString() === eventId);
	} catch (error: unknown) {
		return null;
	}
}

export const addEvent = async (userId: string, event: IEvent, role: string): Promise<IUser | IEvent | null> => {
	try {
		if (role === 'admin') {
			const ev = await Event.create(event);
			await ev.save();
			return ev;
		} else {
			const user = await User.findOne({ _id: userId });
			if (user!.events.find((ev: IEvent) => ev?._id?.toString() === event._id?.toString())) {
				throw 'Event already exists';
			}
			user!.events.push(event);
			await user!.save();
			return user;
		}
	} catch (error: unknown) {
		throw error;
	}
}

export const updateEvent = async (event: IEvent): Promise<IEvent | null> => {
	try {
		const eventToUpdate = await Event.findOneAndUpdate({ _id: event._id }, event, { new: true });
		return eventToUpdate;
	} catch (error: unknown) {
		throw error;
	}
}


export const deleteEvent = async (userId: string, eventId: string, role: string): Promise<IUser | IEvent | null> => {
	try {
		if (role === 'admin') {
			const event = await Event.findOneAndDelete({ _id: eventId });
			return event;
		} else {
			const user = await User.findOne({ _id: userId });
			user!.events = user!.events.filter((event: IEvent) => event._id?.toString() !== eventId);
			await user!.save();
			return user;
		}
	} catch (error: unknown) {
		throw error;
	}
}