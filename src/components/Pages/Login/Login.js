import { useNavigate } from "react-router-dom";
import { useState } from "react";

import * as userAuth from "../../../services/userAuth";

const Login = () => {
	const navigate = useNavigate();
	const [usernameInput, setUsernameInput] = useState("");
	const [passwordInput, setPasswordInput] = useState("");

	const loginHandler = (e) => {
		e.preventDefault();
        setUsernameInput("");
		setPasswordInput("");

		userAuth.loginUser(usernameInput, passwordInput)
            .then(res => {
                localStorage.setItem("token", res.jwtToken);
                navigate('/');
            })
            .catch((err) => {
                console.log(err);
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

			<button type="submit" className="btn btn-primary" onClick={(e) => {loginHandler(e)}}>
				Submit
			</button>
		</form>
	);
};

export default Login;
