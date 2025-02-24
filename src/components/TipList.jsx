import { useState, useEffect } from "react";

//COMPONENTS
import FilterBar from "../components/FilterBar";
import TipCard from "../components/TipCard";

//SERVICES
import tipService from "../services/tip.service";

function TipList() {
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
		<section className="max-width-container tip-list">
			{tips.map((tip) => (
				<TipCard key={tip._id} {...tip}/>
			))}
		</section>
	);
}

export default TipList;
