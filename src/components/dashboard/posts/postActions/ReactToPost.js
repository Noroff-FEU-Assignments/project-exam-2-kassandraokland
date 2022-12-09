import { useState } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../../../hooks/useAxios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../../../common/FormError";
import { useForm } from "react-hook-form";

const schema = yup.object().shape({
	symbol: yup.string().required(),
});

export default function ReactButton() {
	const [error, setError] = useState(null);
    const [updated, setUpdated] = useState(false);
    const [emoji, setEmoji] = useState(null);
    const [, setUpdatingPost] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm({
		resolver: yupResolver(schema),
	});

	const http = useAxios();

    let { id } = useParams();

    let { symbol } = JSON.stringify({ symbol: "❤️" })

	const url = `/social/posts/${id}/react/${symbol}`;

	async function onSubmit(data) {
		setError(null);
		setUpdated(false);

		try {
			const response = await http.put(url, data);
            console.log("response", response.data);
            setEmoji(response.data);
            setUpdated(true);

		} catch (error) {
            console.log("error", error);
			setError(error.toString());
		} finally {
            setUpdatingPost(false);
        }
	
	}

    console.log()

	return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                {updated && <div className="success">The post was updated</div>}

                {error && <FormError>{error}</FormError>}

                <div>
                    <label for="emoji">❤️</label>
		            <input id="emoji" type="checkbox" value="❤️" onClick={handleSubmit(onSubmit)} style={{ display: "none" }} {...register("symbol")}/>
                    {errors.symbol && <FormError>{errors.symbol.message}</FormError>} 
                </div>

            </form>
        </>
	);
}

// { updated ? (<div>
//<div>❤️</div>
//<p className="text-muted"> {emoji.count} likes</p>
//</div>
//) : " " 
//}


/**        const options = {
            body: JSON.stringify({ symbol: "❤️" })
        } */

//style={{ display: "none" }}
//{error ? "Error" : "❤️" } 

/**            <div>
                <p>❤️</p>
                <p>{emoji.count}</p>
            </div> */

/**value="❤️" id={symbol}  */

/**ReactButton.propTypes = {
	id: PropTypes.number.isRequired,
};*/

/**           <div id={emoji.postId}>
                <p>{emoji.symbol}</p>
                <p>{emoji.count}</p>
            </div> */