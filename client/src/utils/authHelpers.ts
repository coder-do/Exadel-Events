import { NavigateFunction } from "react-router-dom";
import { axios_instance } from "./axios";
import { MessageApi } from 'antd/lib/message';

interface LogoutProps {
	navigate: NavigateFunction;
	setIsLoggedIn: (isLoggedIn: boolean) => void;
	message: MessageApi
}

export const logout = ({ navigate, setIsLoggedIn, message }: LogoutProps) => {
	axios_instance
		.post("/auth/logout")
		.then(() => {
			localStorage.clear();
			setIsLoggedIn(false);
			navigate("/auth/login");
		})
		.catch((err) => {
			message.error(err.message);
		});
}