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

export default function Reactions() {
	const [error, setError] = useState(null);
    //const [updated, setUpdated] = useState(false);
    const [, setEmoji] = useState(null);
    const [, setUpdatingPost] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm({
		resolver: yupResolver(schema),
	});

	const http = useAxios();

    let symbol = "❤️️";

    let { id } = useParams();

	const url = "/social/posts/" + id + "/react/" + symbol ;

	async function onSubmit() {


        setEmoji(true);
        setError(null);

		try {
			const response = await http.put(url);
            console.log(response);
		} catch (error) {
            console.log("error", error);
			setError(error.toString());
		} finally {
            setUpdatingPost(false);
        }
	
	}

	return (
        <>
            <form>

                {error && <FormError>{error}</FormError>}

                <div>
                    <label htmlFor="heart">❤️</label>
		            <input name="heart" id="heart" type="checkbox" value={symbol} onClick={handleSubmit(onSubmit)} style={{ display: "none" }} {...register("symbol")}/>
                    {errors.symbol && <FormError>{errors.symbol.message}</FormError>} 
                </div>

            </form>
        </>
	);
}