import { Link } from "react-router-dom";
import Heading from "../../layout/Heading";
import PostList from "./PostList";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function PostPage() {
	return (
		<Container>
			<Row>
				<Col></Col>
				<Col lg={5} md={7} xs="auto" className="m-5">
					<Heading size="3" content="Posts" />
					<Button className="m-3">
						<Link to="/dashboard/posts/add">Add post</Link>
					</Button>
					<div>
						<PostList/>
					</div>
				</Col>
				<Col></Col>
			</Row>
		</Container>
	);
}