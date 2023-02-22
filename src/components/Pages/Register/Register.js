import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Regiseter = () => {

	return (
		<form className="register-form">
			<div className="mb-3">
				<label htmlFor="exampleInputEmail1" className="form-label">
					Username
				</label>
				<input
					type="text"
					className="form-control"
					id="usernameInput"
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
				/>
			</div>

			<button type="submit" className="btn btn-primary">
				Submit
			</button>
		</form>
	);
};

export default Regiseter;
