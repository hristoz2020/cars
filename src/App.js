import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navigation from "./components/Navigation/Navigation";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

function App() {
	const [token, setToken] = useState(localStorage.getItem("token") ?? null);
	const isLoggedIn = token ? (
		<Navigate replace to="/home" />
	) : (
		<Navigate replace to="/login" />
	);

	return (
		<div className="cars">
			{token && <Navigation token={token} setToken={setToken} />}

			<Routes>
				<Route path="/" element={isLoggedIn} />
				<Route path="/home" element={<Home token={token} />} />
				<Route path="/login" element={<Login setToken={setToken} />} />
				<Route path="/register" element={<Register />} />
				<Route
					path="*"
					element={<h1 className="text-center">Page not found!</h1>}
				/>
			</Routes>
		</div>
	);
}

export default App;
