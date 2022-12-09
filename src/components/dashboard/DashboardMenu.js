import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { PersonFill } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";

export default function DashboardMenu() {
	const [auth, ] = useContext(AuthContext);

	return (
		<Container>
			<Nav className="dashboard-menu">
				<Link to={`/users/${auth.name}`}><PersonFill /></Link>
			</Nav>
		</Container>
	);
}