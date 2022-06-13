import React from "react";
import HomeIcon from "assets/logo.png";

export interface IMenuItem {
	key: string;
	label?: string;
	link: string;
	canBeHidden: boolean;
	icon?: React.ReactElement;
}

export const menuItems: IMenuItem[] = [
	{
		key: "0",
		icon: <img width={150} src={HomeIcon} alt="Home" />,
		canBeHidden: false,
		link: "/",
	},
	{
		key: "2",
		label: "Log in",
		canBeHidden: true,
		link: "/auth/login",
	},
	{
		key: "3",
		label: "Sign up",
		canBeHidden: true,
		link: "/auth/register",
	},
];
