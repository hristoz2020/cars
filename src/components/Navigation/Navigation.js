import { Link, useNavigate } from "react-router-dom";

const Navigation = ({ token, setToken }) => {
    const navigate = useNavigate();

	const loginAndRegister = (
		<>
			<Link className="nav-link" to="/login">
				Login
			</Link>
			<Link className="nav-link" to="/register">
				Register
			</Link>
		</>
	);

	const logout = (
		<button
			onClick={() => {
				setToken("");
                localStorage.clear();
                navigate('/login');
			}}
		>
			Logout
		</button>
	);

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<div className="container-fluid">
				<Link className="navbar-brand" to="/">
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
						<Link className="nav-link" to="/cars">
							Cars
						</Link>
						{token ? logout : loginAndRegister}
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navigation;
