import Heading from "../layout/Heading"
import ProfilesList from "./ProfilesList";
import Container from "react-bootstrap/Container";

export default function PostPage() {
	return (
            <>
                <Container>
                    <Heading size="3" content="Profiles" />
					<ProfilesList/>
			    </Container>
            </>
	);
}