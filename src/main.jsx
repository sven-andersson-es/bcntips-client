import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./sass/index.scss";
import App from "./App.jsx";
import { HashRouter as Router } from "react-router-dom";

//CONTEXT
import { AuthProviderWrapper } from "./context/auth.context";
import { MessageProviderWrapper } from "./context/message.context";

createRoot(document.getElementById("root")).render(
	
	<StrictMode>
		<Router forceRefresh={true}>
			<MessageProviderWrapper>
				<AuthProviderWrapper>
					<App />
				</AuthProviderWrapper>
			</MessageProviderWrapper>
		</Router>
	</StrictMode>
);
