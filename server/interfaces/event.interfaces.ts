export interface IEvent {
	_id?: string;
	name: string,
	description: string,
	start_date: Date,
	end_date: Date,
	type: 'online' | 'offline',
	address?: string,
};