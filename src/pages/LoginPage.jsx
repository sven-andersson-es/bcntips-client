import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

//SERVICES
import authService from "../services/auth.service";

//CONTEXT
import { AuthContext } from "../context/auth.context";
import { MessageContext } from "../context/message.context";


function LoginPage(props) {
	const { triggerModal } = useContext(MessageContext);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState(undefined);

	const navigate = useNavigate();

	const { storeToken, authenticateUser } = useContext(AuthContext);

	const handleEmail = (e) => setEmail(e.target.value);
	const handlePassword = (e) => setPassword(e.target.value);

	const handleLoginSubmit = (e) => {
		e.preventDefault();
		const requestBody = { email, password };

		authService
			.login(requestBody)
			.then((response) => {			
				storeToken(response.data.authToken);
				authenticateUser();
				navigate("/");
				triggerModal(true, `Welcome ${response.data.firstName}, you have successfully logged in.`,true)
			})
			.catch((error) => {
				const errorDescription = error.response.data.message;
				setErrorMessage(errorDescription);
			});
	};

	return (
		<section className="max-width-container">
			<div className="form">
				<h1>Login</h1>
				<form onSubmit={handleLoginSubmit}>
					<section className="form__section">
						<div className="form__group">
							<label htmlFor="email">Username (email):</label>
							<input
								type="email"
								name="email"
								id="email"
								placeholder="Fill in your username"
								value={email}
								onChange={handleEmail}
								data-cy="username"
							/>
						</div>
						<div className="form__group">
							<label htmlFor="password">Password:</label>
							<input
								type="password"
								name="password"
								id="password"
								placeholder="Fill in your password"
								value={password}
								onChange={handlePassword}
								data-cy="password"
							/>
						</div>
					</section>
					<section className="form__section">
						<button type="submit" className="btn" data-cy="login-button">Login</button>
					</section>
				</form>
				{errorMessage && <p className="form__error-message">{errorMessage}</p>}
			</div>

			<p>Would you like to save your favourite tips?</p>
			<Link to={"/signup"}> Sign Up</Link>
		</section>
	);
}

export default LoginPage;
