import Container from "react-bootstrap/Container";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"
import SubHeading from "../layout/SubHeading";

export default function GetProfile() {
	const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const http = useAxios();
	const navigate = useNavigate();

	let { name } = useParams();

	if (!name) {
		navigate("/");
	}

	const url = "/social/profiles/" + name;

	useEffect(
		function () {
			async function GetDetails() {
				try {
					const response = await http.get(url);
					console.log("response", response.data);
					setProfile(response.data);;
				} catch (error) {
					console.log(error);
					setError(error.toString());
				} finally {
					setLoading(false);
				}
			}

			GetDetails();
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

    if (loading) return <div>Loading posts...</div>;

	if (error) return <div>{}</div>;

	const defaultBanner = "https://images.pexels.com/photos/1843717/pexels-photo-1843717.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

	const defaultAvatar = "https://images.pexels.com/photos/11798029/pexels-photo-11798029.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

	return (
        <>
            <Container>
                <div style={{ backgroundImage: `url(${profile.banner ? profile.banner : defaultBanner})` }} className="bannerImage" id="banner"></div>
                <Row>
                    <Col>
                        <div style={{ backgroundImage: `url(${profile.avatar ? profile.avatar : defaultAvatar})` }} className="profileImage" id="avatar"></div>
                    </Col>
                    <Col className="m-3">
                        <SubHeading content={`@${profile.name}`}  />
                        <p className="text-muted">{profile.email}</p>
                    </Col>
                </Row>
            </Container>
        </>
	);
}

/**				{auth ? ( 
						<Link to={`/updatebanner/${profile.name}`} ><Button type="link" className="mb-3">Update banner</Button></Link> 
						) : ("")
				} */

/**						{auth ? ( 
						<Link to={`/addmedia/${auth.name}`} ><Button type="link" className="mb-3">Add banner and avatar images</Button></Link> 
						) : ("")
					} */

/**					{auth ? ( 
						<UpdateBanner /> 
						) : ("")
					} */

/**						 */

/**{auth ? ( 
						<Link to={`/updatebanner/${auth.name}`} ><Button type="link" className="mb-3">Update banner</Button></Link> 
						) : ("")
					} */

/*<Card className="posts mb-3" key={profile.name}>
                    <Card.Header>
                        <Link to={`/users/${profile.name}`}>{profile.name}</Link>
                    </Card.Header>
                </Card>*/

/*             <div className="bannerImage" key={profile.name}>
                <img src={profile.banner} alt=""/>
            </div>*/