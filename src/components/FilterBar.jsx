import { useState, useEffect } from "react";

//COMPONENTS
import FilterButton from "../components/FilterButton";

//SERVICES
import categoryService from "../services/category.service";

function FilterBar(props) {
	const {filterTips} = props;
	const [categories, setCategories] = useState([]);

	const getAllCategories = () => {
		categoryService
			.getAllCategories()
			.then((response) => setCategories(response.data))
			.catch((error) => console.log(error));
	};

	useEffect(() => {
		getAllCategories();
	}, []);
    

	return (
		<section className="max-width-container filter-bar">
			{categories.map((btn) => (
				<FilterButton key={btn._id} {...btn} filterTips={filterTips}/> //{...btn}
			))}
		</section>
	);
}

export default FilterBar;