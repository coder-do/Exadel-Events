import React, { useEffect, lazy, Suspense } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { message, Spin } from "antd";
import { AppContext } from "context/context";
import Home from "components/Home/Home";
import MainHeader from "components/Header/Header";
import { loginStatus } from "utils/loginStatus";
import "./App.sass";

const EventDetails = lazy(() => import("components/EventDetails/EventDetails"));
const UpdateEvent = lazy(() => import("components/UpdateEvent/updateEvent"));
const UserEvents = lazy(() => import("components/UserEvents/UserEvents"));
const AddEvent = lazy(() => import("components/AddEvent/AddEvent"));
const Register = lazy(() => import("components/Register/Register"));
const Login = lazy(() => import("components/Login/Login"));
const NotFound = lazy(() => import("components/404/404"));

const App: React.FC = () => {
	const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
	const navigate = useNavigate();

	useEffect(() => {
		loginStatus(navigate, setIsLoggedIn, message);
	}, []);

	return (
		<AppContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
			<MainHeader></MainHeader>
			<Suspense
				fallback={
					<div className="loader">
						<Spin size="large" className="loader" />
					</div>
				}
			>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="events">
						<Route path="add" element={<AddEvent />} />
						<Route path="my" element={<UserEvents />} />
						<Route path="update/:id" element={<UpdateEvent />} />
						<Route path="details/:id" element={<EventDetails />} />
					</Route>
					<Route path="auth">
						<Route path="register" element={<Register />} />
						<Route path="login" element={<Login />} />
					</Route>
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Suspense>
		</AppContext.Provider>
	);
};

export default App;
