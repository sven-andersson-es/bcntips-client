import { useState } from "react";

import { Routes, Route } from "react-router-dom";

//COMPONENTS
import Navbar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage"
import LoginPage from "./pages/LoginPage"
import TipAdminPage from "./pages/TipAdminPage"

//AUTH COMPONENTS
import IsPrivate from "./components/IsPrivate";
import IsPrivateSuper from "./components/IsPrivateSuper";
import IsAnon from "./components/IsAnon";

function App() {
  const [menuActive,setMenuActive] = useState(false);
	return (
		<div className={`App ${menuActive ? "active-menu" : ""}`}>
			<header>
				<Navbar menuActive={menuActive} setMenuActive={setMenuActive}/>
			</header>
			<main>
				<Routes>
					<Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<IsAnon> <SignupPage /> </IsAnon>} />
          <Route path="/login" element={<IsAnon> <LoginPage /> </IsAnon>} />

          <Route
            path="/tip/create"
            element={ <IsPrivateSuper> <TipAdminPage /> </IsPrivateSuper> } 
          />
          <Route
            path="/tip/edit/:tipId"
            element={ <IsPrivateSuper> <TipAdminPage /> </IsPrivateSuper> } 
          />
  


				</Routes>
			</main>
		</div>
	);
}

export default App;
