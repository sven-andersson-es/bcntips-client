import { useContext } from "react";
import { Navigate } from "react-router-dom";

//CONTEXT
import { AuthContext } from "../context/auth.context";

function IsPrivate({ children }) {
	const { isLoggedIn, isLoading } = useContext(AuthContext);

	if (isLoading) {
		//triggerModal(true, `Logging in...`);
	}

	if (!isLoggedIn) {
		return <Navigate to="/login" />;
	} else {
		// If the user is logged in, allow to see the page
		return children;
	}
}

export default IsPrivate;
