import { Link, useNavigate } from "react-router-dom";

const Navigation = ({ token, setToken }) => {
	const navigate = useNavigate();

	const loginAndRegister = (
		<div className="login-register d-flex">
			<Link className="nav-link active" to="/login">
				Login
			</Link>
			<Link className="nav-link active" to="/register">
				Register
			</Link>
		</div>
	);

	const logout = (
		<button
			className="logout-btn"
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
		<nav className="navbar navbar-expand-lg navbar-light bg-light d-flex">
			<div className="container-fluid">
				<Link className="navbar-brand" to="#">
					Cars App
				</Link>

				<div
					className="collapse navbar-collapse"
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
						<Link className="nav-link active" to="/cars">
							Cars
						</Link>
					</div>
				{token ? logout : loginAndRegister}
				</div>
			</div>
		</nav>
	);
};

export default Navigation;
