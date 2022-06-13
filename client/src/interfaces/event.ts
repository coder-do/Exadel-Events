export interface IEvent {
	_id?: string;
	name: string;
	description: string;
	start_date: string;
	end_date: string;
	type: string;
	address?: string;
}