import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import CommentButton from "./postActions/Comment";
import Reactions from "./postActions/Reaction";

export default function EditPost() {
	const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const http = useAxios();

	let { id } = useParams();

	const url = `/social/posts/${id}?_author=true&_comments=true&_reactions=true`;

	useEffect(
		function () {
			async function getPost() {
				try {
					const response = await http.get(url);
					console.log("response", response.data);
					setPost(response.data);
				} catch (error) {
					console.log(error);
					setError(error.toString());
				} finally {
					setLoading(false);
				}
			}

			getPost();
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

    if (loading) return <div>Loading posts...</div>;

	if (error) return <div>{}</div>;

	return (
        <Container>
            <Card className="posts mb-3" key={post.id}>
                <Card.Header>
                    <Link to={`/users/${post.author.name}`}>{post.author.name}</Link>
                </Card.Header>
                <Card.Img src={post.media}></Card.Img>
                <Card.Text>{post.body}</Card.Text>
				<Card.Body>
					<p>{post._count.reactions} likes</p>
					<p>{post._count.comments} comments</p>
				</Card.Body>
					<Card.Footer>
					<Reactions />
					<CommentButton />
					<Link to={`/dashboard/posts/edit/${post.id}`}>Edit post</Link>
				</Card.Footer>
            </Card>
        </Container>
	);
}

/*export default function PostList() {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

    const [searchParams, setSearchParams] = useSearchParams({});
  

	const http = useAxios();

    
    //let params = (new URL(document.location)).searchParams;
    //let name = params.get('name'); // is the string "Jonathan Smith".
    //let id = parseInt(params.get("id")); // is the number 18

	useEffect(function () {
		async function getMedia() {
			try {
				const response = await http.get(`/social/posts/?_author=true&_comments=true&_reactions=true`);
				console.log("response", response);
				setPosts(response.data);
                console.log(response.data);
                //setSearchParams(response.data.id);
                //console.log(searchParams);
			} catch (error) {
				console.log(error);
				setError(error.toString());
			} finally {
				setLoading(false);
			}
		}

		getMedia();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (loading) return <div>Loading posts...</div>;

	if (error) return <div>{}</div>;

    const singlePost = searchParams.get("posts");

	return (
            {singlePost ? (
              <p>
                Your favorite fruit is <b>{favoriteFruit}</b>
              </p>
            ) : (
              <i>No favorite fruit selected yet.</i>
            )}
                <Container className="posts">
                    {posts.map((media) => {
                        return (
                        <Card className="posts mb-3" key={media.id}>
                            <Card.Header>
                                {media.author.name}
                            </Card.Header>
						    <Link to={`/dashboard/posts/${media.id}`}>{media.title}</Link>
                            <Card.Img src={media.media}></Card.Img>
                            <Card.Text>{media.body}</Card.Text>
                        </Card>
                        );
                    })}
                </Container>
			);
                

}*/

/*export default function PostPage() {
	return (
		<DashboardPage>
			<Heading size="3" content="Posts" />
			<p>
				<Link to="/dashboard/posts/add">Add post</Link>
			</p>
			<Container>
					<PostList/>
			</Container>
		</DashboardPage>
	);
}*/