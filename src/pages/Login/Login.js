import { useNavigate } from "react-router-dom";
import { useState } from "react";

import LoadingButton from "../../components/LoadingButton/LoadingButton";
import * as userAuth from "../../services/userAuth";

const Login = ({ setToken }) => {
	const navigate = useNavigate();
	const [usernameInput, setUsernameInput] = useState("");
	const [passwordInput, setPasswordInput] = useState("");

	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState("");

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
				setIsError(err);
				setIsLoading(false);
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
			{isError && (
				<p className="invalid-input">Invalid Username or Password!</p>
			)}
			{isLoading ? (
				<LoadingButton />
			) : (
				<button
					type="submit"
					className="btn btn-primary"
					onClick={(e) => {
						setIsLoading(true);
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