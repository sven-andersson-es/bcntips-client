import { useState, useEffect } from "react";

//COMPONENTS
import GoogleMap from "../components/GoogleMap";
import TipList from "../components/TipList";
import FilterBar from "../components/FilterBar";

//SERVICES
import tipService from "../services/tip.service";

function HomePage() {
	const [tips, setTips] = useState([]);
	const [filter, setFilter] = useState({});

	const getAllTips = () => {
		tipService
			.getAllTips()
			.then((response) => setTips(response.data))
			.catch((error) => console.log(error));
	};

  const filterTips = (filter) => {
    const {categories,barrios} = filter;
    const filteredTips = tips.filter((tip) => {
      return tip.category.includes(categories) && tip.barrio.includes(barrios)
    })
    setTips(filteredTips)
  }

	useEffect(() => {
		getAllTips(filter);
	}, [filter]);


	return (
		<>
			<GoogleMap tips={tips} />
			<FilterBar filter={setFilter}/>
			<TipList tips={tips} />
		</>
	);
}

export default HomePage;
