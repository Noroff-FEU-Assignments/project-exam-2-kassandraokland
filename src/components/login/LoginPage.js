import Heading from "../layout/Heading";
import LoginForm from "./LoginForm";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function LoginPage() {
	return (
		<>
			<Container>
				<Row>
					<Col></Col>
					<Col md={5} xs="auto" className="m-4">
						<Heading content="Log in"/>
						<LoginForm />
					</Col>
					<Col></Col>
				</Row>
			</Container>
		</>
	);
}