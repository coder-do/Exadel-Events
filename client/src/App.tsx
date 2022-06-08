import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { AppContext } from "context/context";
import MainHeader from "components/Header/Header";
import Register from "components/Register/Register";
import Login from "components/Login/Login";
import "./App.sass";
import Home from "components/Home/Home";

const App: React.FC = () => {
	const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);

	useEffect(() => {
		const expiresIn = localStorage.getItem("expiresIn");
		if (expiresIn) {
			const expires = new Date(expiresIn);
			if (expires.getTime() < Date.now()) {
				localStorage.clear();
				setIsLoggedIn(false);
			} else {
				setIsLoggedIn(true);
			}
		}
	}, []);

	return (
		<AppContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
			<MainHeader></MainHeader>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="auth">
					<Route path="register" element={<Register />} />
					<Route path="login" element={<Login />} />
				</Route>
				<Route path="*" element={<div>404</div>} />
			</Routes>
		</AppContext.Provider>
	);
};

export default App;
