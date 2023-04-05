import { Link, useNavigate } from "react-router-dom";

const Navigation = ({ token, setToken }) => {
	const navigate = useNavigate();
	const userName = JSON.parse(localStorage.getItem("userData")).firstName;

	const loginAndRegister = (
		<div className="login-register d-flex">
			<Link className="nav-link active login-btn" to="/login">
				Login
			</Link>
			<Link className="nav-link active register-btn" to="/register">
				Register
			</Link>
		</div>
	);

	const logout = (
		<button
			className="logout-btn nav-link active bg-dark text-white-50"
			onClick={() => {
				setToken(null);
				localStorage.clear();
				navigate("/login");
			}}
		>
			Logout
		</button>
	);

	return (
		<nav className="navbar d-flex align-items-center bg-dark text-white-50">
			<div className="d-flex">
				<Link className="nav-link active" aria-current="page" to="/">
					Home
				</Link>
				{token ? logout : loginAndRegister}
			</div>
			<div className="d-flex">
				<span>{`Welcome ${userName}!`}</span>
			</div>
		</nav>
	);
};

export default Navigation;