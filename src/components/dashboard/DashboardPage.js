import PropTypes from "prop-types";
import Heading from "../layout/Heading";
import DashboardMenu from "./DashboardMenu";
//import UpdateBanner from "../profiles/update/UpdateBanner";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

export default function DashboardPage({ children }) {
	
	const [auth, ] = useContext(AuthContext);

	return (
		<>
			<Heading content="Dashboard" />
			<DashboardMenu />
			{children ? children : <p>Select a section</p>}

			<Link to={`/updatebanner/${auth.name}`} ><Button type="link" className="mb-3">Update banner image</Button></Link>
			<Link to={`/updateavatar/${auth.name}`} ><Button type="link" className="mb-3">Update profile picture</Button></Link>
		</>
	);
}

DashboardPage.propTypes = {
	children: PropTypes.node,
};