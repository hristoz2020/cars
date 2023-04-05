import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

import LoadingButton from "../../components/LoadingButton/LoadingButton";
import * as userAuth from "../../services/userAuth";

const Login = ({ setToken }) => {
	const navigate = useNavigate();
	const [loginData, setLoginData] = useState({
		username: "",
		password: "",
	});

	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState("");

	const loginHandler = (e) => {
		e.preventDefault();
		if (
			loginData.username.length === 0) {
			setIsError(true);
			setIsLoading(false);
			return;
		} else if (loginData.password.length === 0) {
			setIsError(true);
			setIsLoading(false);
			return;
		}


		userAuth
			.loginUser(loginData)
			.then((res) => {
				setToken(res.jwtToken);
				localStorage.setItem("token", res.jwtToken);
				localStorage.setItem("userData", JSON.stringify(res.user));
				navigate("/");
			})
			.catch((err) => {
				setIsError(err);
				setIsLoading(false);
			});
	};

	return (
		<form className="login-form" method="POST">
			<h1 className="text-center">Login</h1>
			<div className="mb-3">
				<label htmlFor="exampleInput" className="form-label">
					Username
				</label>
				<input
					type="text"
					className="form-control"
					id="usernameLoginInput"
					value={loginData.username}
					onChange={(e) => {
						setLoginData({
							...loginData,
							username: e.target.value,
						});
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
					value={loginData.password}
					onChange={(e) => {
						setLoginData({
							...loginData,
							password: e.target.value,
						});
					}}
				/>
			</div>
			{isError && (
				<p className="invalid-input">Invalid Username or Password!</p>
			)}
			{isLoading ? (
				<LoadingButton />
			) : (
				<div className="d-flex align-items-center justify-content-sm-between">
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
					<Link to="/register" className="navigate-to-login">
						Go to Regiseter
					</Link>
				</div>
			)}
		</form>
	);
};

export default Login;