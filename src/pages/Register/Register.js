import { useState } from "react";
import { useNavigate } from "react-router-dom";

import LoadingButton from "../../components/LoadingButton/LoadingButton";
import { registerUser } from "../../services/userAuth";

const Regiseter = () => {
	const navigate = useNavigate();
	const [isError, setIsError] = useState(false);
	const [registerData, setRegisterData] = useState({
		username: "",
		password: "",
		firstName: "",
		lastName: "",
	});
	const [isLoading, setIsLoading] = useState(false);

	const registerHandler = (e) => {
		e.preventDefault();
		setRegisterData({
			username: "",
			password: "",
			firstName: "",
			lastName: "",
		});
		setIsError(false);

		registerUser(registerData)
			.then((res) => {
				setIsLoading(true);
			})
			.catch((err) => {
				setIsError(err);
			})
			// .finally(() => {
			// 	navigate("/login");
			// });
	};

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
					value={registerData.username}
					onChange={(e) => {
						setRegisterData({
							...registerData,
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
					id="exampleInputPassword1"
					value={registerData.password}
					onChange={(e) => {
						setRegisterData({
							...registerData,
							password: e.target.value,
						});
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
					value={registerData.firstName}
					onChange={(e) => {
						setRegisterData({
							...registerData,
							firstName: e.target.value,
						});
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
					value={registerData.lastName}
					onChange={(e) => {
						setRegisterData({
							...registerData,
							lastName: e.target.value,
						});
					}}
				/>
			</div>
			{isError && (
				<p className="invalid-input">Invalid Registration!</p>
			)}
			{isLoading ? (
				<LoadingButton />
			) : (
				<button
					type="submit"
					className="btn btn-primary"
					onClick={(e) => {
						registerHandler(e);
					}}
				>
					Submit
				</button>
			)}
		</form>
	);
};

export default Regiseter;
