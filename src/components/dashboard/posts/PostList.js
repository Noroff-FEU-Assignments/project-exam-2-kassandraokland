import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import Card from "react-bootstrap/Card";

export default function PostList() {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const http = useAxios();

	useEffect(function () {

		async function getMedia() {
			try {
				const response = await http.get(`/social/posts/?_author=true&_comments=true&_reactions=trueauthor`);
				console.log("response", response);
				setPosts(response.data);
                console.log(response.data);
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

	return (
		<ul className="posts">
			{posts.map((media) => {
				return (
					<li key={media.id}>
                        <Card className="mb-3">
                            <Card.Header>
                                <Link to={`/users/${media.author.name}`}>
                                    {media.author.name}
                                </Link>
                            </Card.Header>
						    <Link to={`/dashboard/posts/${media.id}`}>{media.title}</Link>
                            <Card.Img src={media.media}></Card.Img>
                            <Card.Text>{media.body}</Card.Text>
							<Card.Footer>
								<p>{media._count.reactions} likes</p>
								<p>{media._count.comments} comments</p>
							</Card.Footer>
                        </Card>
					</li>
				);
			})}
		</ul>
	);
}
