import { useState, useEffect } from "react";

//COMPONENTS
import GoogleMap from "../components/GoogleMap";
import TipList from "../components/TipList";
import FilterBar from "../components/FilterBar";

//SERVICES
import tipService from "../services/tip.service";

function HomePage() {
	const [tips, setTips] = useState([]);
  const [filterArray, setFilterArray] = useState([]);
	const [filter, setFilter] = useState("");

	const getAllTips = () => {
		tipService
			.getAllTips()
			.then((response) => setTips(response.data))
			.catch((error) => console.log(error));
	};

  // const filterTips = (type,value,action) => {
  //   filter
  //   if (action === true) {
      
  //   }

    

  //   setFilter(filterString)
  // }

	useEffect(() => {
		getAllTips(filter);
	}, [filter]);


	return (
		<>
			<GoogleMap tips={tips} />
			{/* <FilterBar filter={filterTips}/> */}
			<FilterBar/>
			<TipList tips={tips} />
		</>
	);
}

export default HomePage;
