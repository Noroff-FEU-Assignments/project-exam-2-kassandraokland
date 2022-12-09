import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
//import { PersonFill } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";

function NavLayout(props) {
	const [auth, setAuth] = useContext(AuthContext);

	//const isLoggedIn = props.isLoggedIn;

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
						<Link to="dashboard">Home</Link>
					) : (
						<Link to="/">Home</Link>
					)}
					{auth ? (
						<> 
							<Button onClick={logout} size="sm">Log out</Button>
							<Link to="users">Profiles</Link>
							<Link to="dashboard/posts">Post Page</Link>
						</>
					) : (
						<Link to="/login">Login</Link>
					)}
				</Nav>
			</Container>
		</Navbar>
	);
}

export default NavLayout;