import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navigation from "./components/Navigation/Navigation";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Footer from "./components/Footer/Footer";
import PageNotFound from "./pages/PageNotFound/PageNotFound";

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
				<Route path="*" element={<PageNotFound setToken={setToken} />} />
			</Routes>
			<Footer />
		</div>
	);
}

export default App;