import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useAxios from "../../../../hooks/useAxios";

export default function CommentButton() {
	const [error, setError] = useState(null);

	const http = useAxios();
	const history = useNavigate();

    let { id } = useParams();

	const url = `/social/posts/${id}/comment`;

	async function handleSubmit() {

			try {
				await http.post(url);
				history("/dashboard/posts");
			} catch (error) {
				setError(error);
			}
	
	}

	return (
        <>
            <div>
                <textarea name="body" placeholder="Comment..." />
            </div>
		    <button type="button" className="comment" onClick={handleSubmit}>
			    {error ? "Error" : "Comment"}
		    </button>        
        </>
	);
}
