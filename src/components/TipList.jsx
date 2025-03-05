import { useState, useEffect } from "react";

//COMPONENTS
import FilterBar from "../components/FilterBar";
import TipCard from "../components/TipCard";

function TipList(props) {
	const {tips, favouriteTips, updateFavouriteTips} = props;
	
	
	return (
		<section className="max-width-container tip-list">
			{tips.map((tip) => (
				<TipCard key={tip._id} {...tip} favouriteTips={favouriteTips} updateFavouriteTips={updateFavouriteTips}/>
			))}
		</section>
	);
}

export default TipList;
