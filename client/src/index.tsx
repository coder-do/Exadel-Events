import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/Register/Register";

import "./index.sass";
import "antd/dist/antd.css";
import Login from "./components/Login/Login";
import MainHeader from "./components/Header/Header";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<BrowserRouter>
		<MainHeader></MainHeader>
		<Routes>
			<Route path="/" element={<App />} />
			<Route path="auth">
				<Route path="register" element={<Register />} />
				<Route path="login" element={<Login />} />
			</Route>
			<Route path="*" element={<div>404</div>} />
		</Routes>
	</BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
