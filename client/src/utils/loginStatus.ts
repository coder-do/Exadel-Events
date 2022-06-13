import React from 'react'
import { MessageApi } from "antd/lib/message";
import { NavigateFunction } from 'react-router-dom';

export const loginStatus = (
	navigate: NavigateFunction,
	setIsLoggedIn: (isLoggedIn: boolean) => void,
	message: MessageApi
) => {
	const expiresIn = localStorage.getItem("expiresIn");
	if (expiresIn) {
		const expires = new Date(expiresIn);
		if (expires.getTime() - Date.now() < 0) {
			setIsLoggedIn(false);
			message.info("Session expired. Please log in again.");
			localStorage.clear();
			navigate("/auth/login");
		} else {
			setIsLoggedIn(true);
		}
	}
}