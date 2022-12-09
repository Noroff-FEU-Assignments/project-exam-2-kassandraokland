import PropTypes from "prop-types";
import Heading from "../layout/Heading";
import DashboardMenu from "./DashboardMenu";
//import UpdateBanner from "../profiles/update/UpdateBanner";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import Container from "react-bootstrap/Container";

export default function DashboardPage() {
	
	const [auth, ] = useContext(AuthContext);

	return (
		<Container>
			<Heading content="Dashboard" />
			<DashboardMenu />

			<Link to={`/updatebanner/${auth.name}`} ><Button type="link" className="m-3">Update banner image</Button></Link>
			<Link to={`/updateavatar/${auth.name}`} ><Button type="link" className="m-3">Update profile picture</Button></Link>
		</Container>
	);
}