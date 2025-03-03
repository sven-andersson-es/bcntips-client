import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/auth.service";

//CONTEXT
import { MessageContext } from "../context/message.context";

function SignupPage(props) {
    const { triggerModal } = useContext(MessageContext);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [favouriteTips, setFavouriteTips] = useState([]);
	const [errorMessage, setErrorMessage] = useState(undefined);

	const navigate = useNavigate();

	const handleEmail = (e) => setEmail(e.target.value);
	const handlePassword = (e) => setPassword(e.target.value);
	const handleFirstName = (e) => setFirstName(e.target.value);
	const handleLastName = (e) => setLastName(e.target.value);

	const handleSignupSubmit = (e) => {
		e.preventDefault();
		// Create an object representing the request body - TODO add possibility to add favouriteTips
		const requestBody = { email, password, firstName, lastName, favouriteTips  };

		authService
			.signup(requestBody)
			.then((response) => {
                //console.log(response);
                
				navigate("/login");
                triggerModal(true, `Welcome ${response.data.user.firstName}, you have successfully signed up to barcelonatips.com. You can now login.`,false)

			})
			.catch((error) => {
				const errorDescription = error.response.data.message;
				setErrorMessage(errorDescription);
			});
	};

	return (
		<section className="max-width-container">
			<div className="form">
				<h1>Sign Up</h1>

				<form onSubmit={handleSignupSubmit}>
					<section className="form__section">
						<div className="form__group">
							<label htmlFor="email">Email:</label>
							<input
								type="email"
								name="email"
								id="email"
								value={email}
								onChange={handleEmail}
							/>
						</div>
						<div className="form__group">
							<label htmlFor="password">Password:</label>
							<input
								type="password"
								name="password"
								id="password"
								value={password}
								onChange={handlePassword}
							/>
						</div>
						<div className="form__group">
							<label>First name:</label>
							<input
								type="text"
								name="firstName"
								id="firstName"
								value={firstName}
								onChange={handleFirstName}
							/>
						</div>
						<div className="form__group">
							<label>Last name:</label>
							<input
								type="text"
								name="lastName"
								id="lastName"
								value={lastName}
								onChange={handleLastName}
							/>
						</div>
					</section>
					<section className="form__section">
						<button type="submit" className="btn">
							Sign Up
						</button>
					</section>
				</form>

				{errorMessage && <p className="form__error-message">{errorMessage}</p>}
			</div>
			<p>Already have an account?</p>
			<Link to={"/login"}> Login</Link>
		</section>
	);
}

export default SignupPage;
