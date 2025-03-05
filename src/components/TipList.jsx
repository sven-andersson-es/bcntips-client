import { useState, useEffect } from "react";

//COMPONENTS
import FilterBar from "../components/FilterBar";
import TipCard from "../components/TipCard";

function TipList(props) {
	const {tips, updateFavouriteTips} = props;
	
	
	return (
		<section className="max-width-container tip-list">
			{tips.map((tip) => (
				<TipCard key={tip._id} {...tip} updateFavouriteTips={updateFavouriteTips}/>
			))}
		</section>
	);
}

export default TipList;
