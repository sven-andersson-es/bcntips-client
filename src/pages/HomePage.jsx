import { useState, useEffect } from "react";

//COMPONENTS
import GoogleMap from "../components/GoogleMap";
import TipList from "../components/TipList";
import FilterBar from "../components/FilterBar";

//SERVICES
import tipService from "../services/tip.service";

function HomePage() {
	const [tips, setTips] = useState([]);
	const [filterObject, setFilterObject] = useState({
		category: [],
		barrio: [],
	});
	const [filter, setFilter] = useState("");

	const getAllTips = (filter) => {
		tipService
			.getAllTips(filter)
			.then((response) => setTips(response.data))
			.catch((error) => console.log(error));
	};

	const filterTips = (type, id, action) => {
		console.log("filterObject: ", filterObject);

		let newObject = filterObject;
		if (action) {
			if (newObject[type].indexOf(id) === -1) {
				newObject[type].push(id);
			}
		} else {
			if (newObject[type].indexOf(id) != -1) {
				const reducedArray = newObject[type].filter((item) => item != id);
				newObject = { ...newObject, [type]: reducedArray };
			}
		}
		console.log("newObject: ", newObject);

		setFilterObject(newObject);

		const queryStrings = new URLSearchParams(newObject);
		setFilter(queryStrings.toString());

		console.log("queryStrings: ", queryStrings.toString());
	};

	useEffect(() => {
		getAllTips(filter);
	}, [filter]);

	return (
		<>
			<GoogleMap tips={tips} />
			<FilterBar filterTips={filterTips}/>
			<TipList tips={tips} />
		</>
	);
}

export default HomePage;
