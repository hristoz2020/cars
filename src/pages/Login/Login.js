import { useNavigate } from "react-router-dom";
import { useState } from "react";

import LoadingButton from "../../components/LoadingButton/LoadingButton";
import * as userAuth from "../../services/userAuth";

const Login = ({ token, setToken }) => {
	const navigate = useNavigate();
	const [usernameInput, setUsernameInput] = useState("hristoz123");
	const [passwordInput, setPasswordInput] = useState("123456");

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const loginHandler = (e) => {
		e.preventDefault();
		setUsernameInput("");
		setPasswordInput("");

		userAuth
			.loginUser(usernameInput, passwordInput)
			.then((res) => {
				setToken(res.jwtToken);
				localStorage.setItem("token", res.jwtToken);
				navigate("/");
			})
			.catch((err) => {
				setError(err);
				setLoading(false);
				//console.log(err);
			});
	};

	return (
		<form className="login-form" method="POST">
			<div className="mb-3">
				<label htmlFor="exampleInput" className="form-label">
					Username
				</label>
				<input
					type="text"
					className="form-control"
					id="usernameLoginInput"
					value={usernameInput}
					onChange={(e) => {
						setUsernameInput(e.target.value);
					}}
				/>
			</div>
			<div className="mb-3">
				<label htmlFor="passwordInput" className="form-label">
					Password
				</label>
				<input
					type="password"
					className="form-control"
					id="passwordLoginInput"
					value={passwordInput}
					onChange={(e) => {
						setPasswordInput(e.target.value);
					}}
				/>
			</div>
			{error ? <p className="invalid-input">Invalid Username or Password!</p> : ""}
			{loading ? (
				<LoadingButton />
			) : (
				<button
					type="submit"
					className="btn btn-primary"
					onClick={(e) => {
						setLoading(true);
						loginHandler(e);
					}}
				>
					Submit
				</button>
			)}
		</form>
	);
};

export default Login;
