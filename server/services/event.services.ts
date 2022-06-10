import User from '../models/user.models';
import { IEvent } from 'interfaces/event.interfaces';
import { IUser } from 'interfaces/user.interfaces';

export const getEvents = async (userId: string): Promise<IUser | null> => {
	try {
		const events = await User.findOne({ _id: userId }).select('events');
		return events;
	} catch (error: unknown) {
		return null;
	}
}

export const addEvent = async (userId: string, event: IEvent): Promise<IUser | null> => {
	try {
		const user = await User.findOne({ _id: userId });
		user!.events.push(event);
		await user!.save();
		return user;
	} catch (error: unknown) {
		throw error;
	}
}

export const updateEvent = async (userId: string, event: IEvent): Promise<IUser | null> => {
	try {
		const user = await User.findOne({ _id: userId });
		(user!.events as any).id(event._id).set(event);
		await user!.save();
		return user;
	} catch (error: unknown) {
		throw error;
	}
}


export const deleteEvent = async (userId: string, eventId: string): Promise<IUser | null> => {
	try {
		const user = await User.findOne({ _id: userId });
		user!.events = user!.events.filter((event: IEvent) => event._id?.toString() !== eventId);
		await user!.save();
		return user;
	} catch (error: unknown) {
		throw error;
	}
}