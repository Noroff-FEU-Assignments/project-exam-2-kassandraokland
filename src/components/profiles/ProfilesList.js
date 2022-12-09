import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { PersonCircle } from "react-bootstrap-icons";

export default function ProfileList() {
	const [profiles, setProfiles] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
    const [empty, setValue] = useState("");

	const http = useAxios();

	useEffect(function () {
		async function getMedia() {
			try {
				const response = await http.get(`/social/profiles`);
				console.log("response", response);
				setProfiles(response.data);
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

    if (empty) {
        setValue(<PersonCircle/>);
    }

	if (loading) return <div>Loading posts...</div>;

	if (error) return <div>{}</div>;

	return (
		<Row xs={1} md={3} lr={4} className="g-4 profiles">
			{profiles.map((media) => {

				return (
					<Col key={media.name}>
                        <Card className="m-3">
                            <Card.Body className="p-2">
                                {media.avatar ?
                                    <Card.Img src={media.avatar}></Card.Img> :
                                    <PersonCircle color="dark" size={50} />
                                }
                                <Card.Title>
                                    <Link to={`/users/${media.name}`}>
                                        {media.name}
                                    </Link>
                                </Card.Title>
                            </Card.Body>
                        </Card>
					</Col>
				);
			})}
		</Row>
	);
}

/*<Row xs={1} md={2} className="g-4">
{Array.from({ length: 4 }).map((_, idx) => (
  <Col>
    <Card>
      <Card.Img variant="top" src="holder.js/100px160" />
      <Card.Body>
        <Card.Title>Card title</Card.Title>
        <Card.Text>
          This is a longer card with supporting text below as a natural
          lead-in to additional content. This content is a little bit
          longer.
        </Card.Text>
      </Card.Body>
    </Card>
  </Col>*/

/*<Card.Header>
{media.name}
</Card.Header>
<Link to={`/dashboard/posts/edit/${media.id}`}>{media.title}</Link>
<Card.Img src={media.media}></Card.Img>
<Card.Text>{media.body}</Card.Text>*/