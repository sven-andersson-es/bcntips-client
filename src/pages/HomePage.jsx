import { useState, useEffect } from "react";

//COMPONENTS
import GoogleMap from "../components/GoogleMap";
import TipList from "../components/TipList";
import FilterBar from "../components/FilterBar";

//SERVICES
import tipService from "../services/tip.service";

function HomePage() {
	const [tips, setTips] = useState([]);

	const getAllTips = () => {
		tipService
			.getAllTips()
			.then((response) => setTips(response.data))
			.catch((error) => console.log(error));
	};

	useEffect(() => {
		getAllTips();
	}, []);

	return (
		<>
			<GoogleMap tips={tips} />
			<FilterBar />
			<TipList tips={tips} />
		</>
	);
}

export default HomePage;
