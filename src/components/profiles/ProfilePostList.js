import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import Card from "react-bootstrap/Card";

function ProfilePostList() {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const { name } = useParams();

	const url = `/social/profiles/${name}/posts`;

	const http = useAxios();

	useEffect(function () {

		async function getMedia() {
			try {
				const response = await http.get(url);
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
		<ul>
			{posts.map((post) => {
				return (
					<li key={post.id}>
						<Card className="mb-3">
							<Card.Body>
								<Card.Title>{post.title}</Card.Title>
								<Card.Img src={post.media}></Card.Img>
                            	<Card.Text>{post.body}</Card.Text>
							</Card.Body>
						</Card>
					</li>
				)
			})}
		</ul>
	);
}

export default ProfilePostList;

/* 		<ul className="profile-posts">
			{posts.map((profilePosts) => {
				return (
					<li key={profilePosts.id}>
                        <Card className="mb-3">
                            <Card.Header>
                                {profilePosts.author.name}
                            </Card.Header>
						    <Card.Title>{profilePosts.title}</Card.Title>
                            <Card.Img src={profilePosts.media}></Card.Img>
                            <Card.Text>{profilePosts.body}</Card.Text>
                        </Card>
					</li>
				);
			})}
		</ul>*/

//<Link to={`/dashboard/posts/${media.id}`}>{media.title}</Link>