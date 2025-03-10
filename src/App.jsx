import { useState } from "react";

import { Routes, Route } from "react-router-dom";

//COMPONENTS
import Navbar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage"
import LoginPage from "./pages/LoginPage"
import TipAdminPage from "./pages/TipAdminPage"
import TipDetailPage from "./pages/TipDetailPage";

//AUTH COMPONENTS
import IsPrivateSuper from "./components/IsPrivateSuper";
import IsAnon from "./components/IsAnon";
import NotFound from "./pages/NotFoundPage";

function App() {
  const [menuActive,setMenuActive] = useState(false);
  
	return (
		<div className={`App ${menuActive ? "active-menu" : ""}`}>
			<header>
				<Navbar menuActive={menuActive} setMenuActive={setMenuActive}/>
			</header>
			<main>
				<Routes>
          			<Route path="*" element={<NotFound />} />
					<Route path="/" element={<HomePage />} />
					<Route
						path="/tip/:tipId"
						element={ <TipDetailPage />  } 
					/>
          			<Route path="/signup" element={<IsAnon> <SignupPage /> </IsAnon>} />
          			<Route path="/login" element={<IsAnon> <LoginPage /> </IsAnon>} />
					<Route
						path="/admin/tip/create"
						element={ <IsPrivateSuper> <TipAdminPage /> </IsPrivateSuper> } 
					/>
					<Route
						path="/admin/tip/update/:tipId"
						element={ <IsPrivateSuper> <TipAdminPage /> </IsPrivateSuper> } 
					/>
				</Routes>
			</main>
		</div>
	);
}

export default App;
