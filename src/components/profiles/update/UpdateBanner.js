import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../../common/FormError";
import useAxios from "../../../hooks/useAxios";
import Heading from "../../layout/Heading";
//import Form from "react-bootstrap/Form";

const schema = yup.object().shape({
	banner: yup.string().required("Please add an image url"),
});

export default function UpdateBanner() {
	const [, setMedia] = useState(null);
	const [updated, setUpdated] = useState(false);
	const [fetchingMedia, setFetchingMedia] = useState(true);
	const [updatingMedia, setUpdatingMedia] = useState(false);
	const [fetchError, setFetchError] = useState(null);
	const [updateError, setUpdateError] = useState(null);
	//const [auth, setAuth] = useContext(AuthContext);

	const { register, handleSubmit, formState: { errors } } = useForm({
		resolver: yupResolver(schema),
	});

	const http = useAxios();

	let { name } = useParams();

	const url = `/social/profiles/${name}`;

	useEffect(
		function () {
			async function getMedia() {
				try {
					const response = await http.get(url);
					console.log("response", response.data);
					setMedia(response.data);
					//setAuth(response.data);
				} catch (error) {
					console.log(error);
					setFetchError(error.toString());
				} finally {
					setFetchingMedia(false);
				}
			}

			getMedia();
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	async function onSubmit(data) {
		setUpdatingMedia(true);
		setUpdateError(null);
		setUpdated(false);

		console.log(data);

		try {
			await http.put(`${url}/media`, data);
			setUpdated(true);
			//setAuth(response.data);
		} catch (error) {
			console.log("error", error);
			setUpdateError(error.toString());
		} finally {
			setUpdatingMedia(false);
		}
	}

	if (fetchingMedia) return <div>Loading...</div>;

	if (fetchError) return <div>Error loading post</div>;


	return (
        <>
			<Heading content="Update banner" />
            <form onSubmit={handleSubmit(onSubmit)}>
				{updated && <div className="success">The post was updated</div>}

				{updateError && <FormError>{updateError}</FormError>}


				<fieldset disabled={updatingMedia}>

					<div>
						<input id="banner" name="banner" placeholder="Enter an image url" {...register("banner")}/>
						{errors.banner && <FormError>{errors.banner.message}</FormError>}
						
					</div>
					<button>{updatingMedia ? "Updating..." : "Update"}</button>
				</fieldset>

            </form>
        </>
	);
}


/**{errors.media && <FormError>{errors.banner.message}</FormError>} */

/*defaultValue={media.banner}*/
/**					<div>
						<input name="content" defaultValue={media.banner} placeholder="Content" ref={register} />
						{errors.banner && <FormError>{errors.banner.message}</FormError>}
					</div> */

/**					<div>
						<MediaDropdown register={register} />
					</div> */