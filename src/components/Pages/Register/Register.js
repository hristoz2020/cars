import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Loading from "../../Loading/Loading";
import * as userAuth from "../../../services/userAuth";

const Regiseter = () => {
	const navigate = useNavigate();
	const [usernameInput, setUsernameInput] = useState("");
	const [passwordInput, setPasswordInput] = useState("");
	const [firstNameInput, setFirstNameInput] = useState("");
	const [lastNameInput, setLastNameInput] = useState("");

	const registerHandler = (e) => {
		e.preventDefault();
        setUsernameInput("");
		setPasswordInput("");
        setFirstNameInput("");
		setLastNameInput("");

		userAuth.regiserUser(usernameInput,passwordInput, firstNameInput,lastNameInput)
			.then(res => {
				navigate('/login');
			})
			.catch((err) => {
				console.log(err);
			})
	}

	return (
		<form className="register-form" method="POST">
			<div className="mb-3">
				<label htmlFor="exampleInputEmail1" className="form-label">
					Username
				</label>
				<input
					type="text"
					className="form-control"
					id="usernameInput"
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
					id="exampleInputPassword1"
					value={passwordInput}
					onChange={(e) => {
						setPasswordInput(e.target.value);
					}}
				/>
			</div>

			<div className="mb-3">
				<label htmlFor="firstNameInput" className="form-label">
					First Name
				</label>
				<input
					type="text"
					className="form-control"
					id="firstName"
					value={firstNameInput}
					onChange={(e) => {
						setFirstNameInput(e.target.value);
					}}
				/>
			</div>

			<div className="mb-3">
				<label htmlFor="lastNameInput" className="form-label">
					Last Name
				</label>
				<input
					type="text"
					className="form-control"
					id="lastName"
					value={lastNameInput}
					onChange={(e) => {
						setLastNameInput(e.target.value);
					}}
				/>
			</div>

			<button type="submit" className="btn btn-primary" onClick={(e) => {registerHandler(e)}}>
				Submit
			</button>
		</form>
	);
};

export default Regiseter;