import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navigation from "./components/Navigation/Navigation";
import Home from "./components/Pages/Home/Home";
import Cars from "./components/Pages/Cars/Cars";
import Login from "./components/Pages/Login/Login";
import Register from "./components/Pages/Register/Register";

function App() {
    const [token,setToken] = useState(localStorage.getItem('token') ?? null);

	return (
		<div className="cars">
            <Navigation token={token} setToken={setToken} />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cars" element={<Cars />} />
                <Route path="/login" element={<Login setToken={setToken} />} />
                <Route path="/register" element={<Register />} />
            </Routes>
		</div>
	);
}

export default App;
