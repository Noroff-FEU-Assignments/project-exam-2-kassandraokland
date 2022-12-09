import { Link } from "react-router-dom";
import Heading from "../../layout/Heading";
import PostList from "./PostList";
import Container from "react-bootstrap/Container";

export default function PostPage() {
	return (
		<Container>
			<Heading size="3" content="Posts" />
			<button>
				<Link to="/dashboard/posts/add">Add post</Link>
			</button>
			<div>
					<PostList/>
			</div>
		</Container>
	);
}