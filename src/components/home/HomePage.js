import Heading from "../layout/Heading";
import RegisterForm from "../login/RegisterForm";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function HomePage({ children }) {
	return (
		<>
			<Container>
        		<Row>
					<Col></Col>
          			<Col md={5} xs="auto" className="m-5">
						<Heading content="Welcome to Shary." />
						<p className="text-muted">A social media platform.</p>
            			<RegisterForm />
          			</Col>
					<Col></Col>
        		</Row>
			</Container>
		</>
	);
}