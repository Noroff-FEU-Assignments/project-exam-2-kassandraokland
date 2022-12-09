import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import FormError from "../common/FormError";
import { BASE_URL } from "../../constants/api";
import AuthContext from "../../context/AuthContext";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { LockFill } from "react-bootstrap-icons";
import { EnvelopeFill } from "react-bootstrap-icons";
import useLocalStorage from "../../hooks/useLocalStorage";


const url = BASE_URL + "/social/auth/login";

const schema = yup.object().shape({
	email: yup.string()
		.email()
		.matches(/(stud.noroff.no)/, { message : `Only "stud.noroff.no" email addresses are accepted.` })
		.required("Please enter your email."),
	password: yup.string()
		.required({ message : "Please enter your password." | "Incorrect password." }),
});

/**	
	password: yup.string()
	.matches(`("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})")`)
	.required("Please enter your password"), */


export default function LoginForm() {
	const [submitting, setSubmitting] = useState(false);
	const [loginError, setLoginError] = useState(null);
	const [email, setEmail] = useLocalStorage();

    const history = useNavigate();

	const { register, handleSubmit, formState: { errors } } = useForm({
		resolver: yupResolver(schema),
	});

	const [, setAuth] = useContext(AuthContext);

	async function onSubmit(data) {

		setSubmitting(true);
		setLoginError(null);
		   
		console.log(data);

		try {
			const response = await axios.post(url, data);
			console.log("response", response.data);

			setAuth(response.data);
            history("/dashboard");
		} catch (error) {
			console.log("error", error);
			setLoginError(error.toString());
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<>
		  	<Form onSubmit={handleSubmit(onSubmit)} className="mt-3">
		  		{loginError && <FormError>{loginError}</FormError>}
					<Form.Group className="mb-3" controlId="formBasicEmail" disabled={submitting}>
			  			<InputGroup className="mb-3" controlid="formEmail">
							<InputGroup.Text id="basic-addon1"><EnvelopeFill /></InputGroup.Text>
							<Form.Control 
							aria-label="email" 
							type="email"
							placeholder="Enter email" 
							value={email} 
							name="email" 
							onChange={(e) => setEmail(e.target.value)}
							{...register("email")} />
			  			</InputGroup>
						{errors.email && <FormError>{errors.email.message}</FormError>}
					</Form.Group>
	
					<Form.Group className="mb-3" controlId="formBasicPassword" disabled={submitting}>
			  			<InputGroup className="mb-3" controlid="formPassword">
							<InputGroup.Text  id="basic-addon1"><LockFill /></InputGroup.Text>
							<Form.Control 
							aria-label="Password" 
							type="password" 
							placeholder="Password" 
							name="password" 
							{...register("password")} />
			  			</InputGroup> 
						{errors.password && <FormError>{errors.password.message}</FormError>}
				</Form.Group>
			
	
		  		<Button type="submit" className="mb-3"> 
			  		{submitting ? "Logging in..." : "Log in"}
		  		</Button>

			</Form>
		</>
	);
}