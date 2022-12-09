import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

function NavLayout() {
	const [auth, setAuth] = useContext(AuthContext);

	const history = useNavigate();
	
	function logout() {
		setAuth(null);
		history("/");
	}

	return (
		<Navbar bg="dark" expand="lg">
			<Container>
				{auth ? (
					<Link to="dashboard">
						<Navbar.Brand className="logo">Shary</Navbar.Brand>
					</Link>
				) : (
					<Link to="/">
						<Navbar.Brand className="logo">Shary</Navbar.Brand>
					</Link>
				)}
				<Nav>
					{auth ? (
						<Link to="dashboard" className="m-2">Dashboard</Link>
					) : (
						<Link to="/" className="m-2">Home</Link>
					)}
					{auth ? (
						<> 
							<Button onClick={logout} size="sm" className="m-2">Log out</Button>
							<Link to="users" className="m-2">Profiles</Link>
							<Link to="dashboard/posts" className="m-2">Post Page</Link>
						</>
					) : (
						<Link to="/login" className="m-2">Login</Link>
					)}
				</Nav>
			</Container>
		</Navbar>
	);
}

export default NavLayout;