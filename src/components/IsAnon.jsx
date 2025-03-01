import { useContext } from "react";
import { Navigate } from "react-router-dom";

//CONTEXT
import { AuthContext } from "../context/auth.context";

function IsAnon({ children }) {
	const { isLoggedIn, isLoading } = useContext(AuthContext);


	if (isLoading) {
		//triggerModal(true, `Loading...`);
	}

	if (isLoggedIn) {
		// If the user is logged in, navigate to home page ❌
		return <Navigate to="/" />;
	} else {
		// If the user is not logged in, allow to see the page ✅
		return children;
	}
}

export default IsAnon;
