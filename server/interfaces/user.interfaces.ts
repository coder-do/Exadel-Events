import { IEvent } from "interfaces/event.interfaces";

export interface IUser {
	_id?: string;
	name: string,
	email: string,
	password: string,
	role: 'admin' | 'user',
	events: IEvent[],
};