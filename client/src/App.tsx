import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { message } from "antd";
import { AppContext } from "context/context";
import Home from "components/Home/Home";
import NotFound from "components/404/404";
import Login from "components/Login/Login";
import MainHeader from "components/Header/Header";
import AddEvent from "components/AddEvent/AddEvent";
import Register from "components/Register/Register";
import EventDetails from "components/EventDetails/EventDetails";
import UserEvents from "components/UserEvents/UserEvents";
import { loginStatus } from "utils/loginStatus";
import "./App.sass";
import UpdateEvent from "components/UpdateEvent/updateEvent";

const App: React.FC = () => {
	const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
	const navigate = useNavigate();

	useEffect(() => {
		loginStatus(navigate, setIsLoggedIn, message);
	}, []);

	return (
		<AppContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
			<MainHeader></MainHeader>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="events">
					<Route path="add" element={<AddEvent />} />
					<Route path="my" element={<UserEvents />} />
					<Route path="update/:id" element={<UpdateEvent />} />
					<Route path=":id" element={<EventDetails />} />
				</Route>
				<Route path="auth">
					<Route path="register" element={<Register />} />
					<Route path="login" element={<Login />} />
				</Route>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</AppContext.Provider>
	);
};

export default App;
