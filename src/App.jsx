import { Routes, Route } from "react-router-dom";

//COMPONENTS
import Navbar from "./components/NavBar";
import HomePage from "./pages/HomePage";

function App() {
	return (
		<div className="App">
			<header>
				<Navbar />
			</header>
			<main>
				<Routes>
					<Route path="/" element={<HomePage />} />

					{/* <Route
            path="/projects"
            element={ <IsPrivate> <ProjectListPage /> </IsPrivate> } 
          />
  
          <Route
            path="/projects/:projectId"
            element={ <IsPrivate> <ProjectDetailsPage /> </IsPrivate> }
          />
  
          <Route
            path="/projects/edit/:projectId"
            element={ <IsPrivate> <EditProjectPage /> </IsPrivate> } 
          />
          
          <Route path="/signup" element={<IsAnon> <SignupPage /> </IsAnon>} />
          <Route path="/login" element={<IsAnon> <LoginPage /> </IsAnon>} /> */}
				</Routes>
			</main>
		</div>
	);
}

export default App;
