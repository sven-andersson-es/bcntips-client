import React, { useState, useEffect } from "react";
import authService from "../services/auth.service";

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isLoggedInSuper, setIsLoggedInSuper] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [user, setUser] = useState(null);

	const storeToken = (token) => {
		localStorage.setItem("authToken", token);
	};

	const authenticateUser = () => {
		// Get the stored token from the localStorage
		const storedToken = localStorage.getItem("authToken");

		// If the token exists in the localStorage
		if (storedToken) {
			authService
				.verify()
				.then((response) => {
					const user = response.data;
					setIsLoggedIn(true);
					if (response.data.userRole === "SUPERADMIN") {
						setIsLoggedInSuper(true);
					}
					setIsLoading(false);
					setUser(user);
				})
				.catch((error) => {
					// If server error (invalid token)
					setIsLoggedIn(false);
					setIsLoggedInSuper(false);
					setIsLoading(false);
					setUser(null);
				});
		} else {
			// If the token is not available
			setIsLoggedIn(false);
			setIsLoggedInSuper(false);
			setIsLoading(false);
			setUser(null);
		}
	};

	const removeToken = () => {
		// Upon logout, remove the token from the localStorage
		localStorage.removeItem("authToken");
	};

	const logOutUser = () => {
		removeToken();
		authenticateUser();
	};

	useEffect(() => {
		// Run the function after the initial render,
		// after the components in the App render for the first time.
		authenticateUser();
	}, []);

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn,
                isLoggedInSuper,
				isLoading,
				user,
				storeToken,
				authenticateUser,
				logOutUser,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
}

export { AuthProviderWrapper, AuthContext };
