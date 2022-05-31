import { Link } from "react-router-dom";
import "./App.sass";
import React from "react";

const App: React.FC = () => {
	return (
		<>
			<p>Hello</p>
			<Link to="auth/register">
				register page <br />
			</Link>
			<Link to="auth/login">login page</Link>
		</>
	);
};

export default App;
