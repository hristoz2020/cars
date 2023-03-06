import { Link, useNavigate } from "react-router-dom";

const Navigation = ({ token, setToken }) => {
	const navigate = useNavigate();

	const loginAndRegister = (
		<div className="login-register d-flex justify-content-end">
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
			className="logout-btn justify-content-end"
			onClick={() => {
				setToken("");
				localStorage.clear();
				navigate("/login");
			}}
		>
			Logout
		</button>
	);

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<div className="container-fluid">

				<div
					className="collapse navbar-collapse d-flex"
					id="navbarNavAltMarkup"
				>
					<div className="navbar-nav">
						<Link
							className="nav-link active"
							aria-current="page"
							to="/"
						>
							Home
						</Link>
					</div>
				{token ? logout : loginAndRegister}
				</div>
			</div>
		</nav>
	);
};

export default Navigation;
