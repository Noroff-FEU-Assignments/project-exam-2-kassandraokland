import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { PersonFill } from "react-bootstrap-icons";

export default function DashboardMenu() {
	const [auth, ] = useContext(AuthContext);

	return (
		<Container>
			<Nav className="dashboard-menu">
				<Link to={`/users/${auth.name}`}><PersonFill className="m-2" />My profile page</Link>
			</Nav>
		</Container>
	);
}