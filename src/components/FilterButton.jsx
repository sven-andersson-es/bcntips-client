import { useState, useEffect } from "react";

function FilterButton(props) {
	const [btnActive, setBtnActive] = useState(false);

	const { _id, categoryName, categoryIcon, filterTips } = props;
	const decodedIcon = atob(categoryIcon);
	console.log(props);

	return (
		<>
			<button className={`filter-bar__button${btnActive ? "--active" : ""}`} onClick={() => {filterTips("category", _id, btnActive ? false : true), setBtnActive(!btnActive)}}>
				<div
					className="filter-bar__icon"
					dangerouslySetInnerHTML={{ __html: decodedIcon }}
				/>
				<div className="filter-bar__category-title">{categoryName}</div>
			</button>
		</>
	);
}

export default FilterButton;
