function FilterButton(props) {
	const { categoryName, categoryIcon, filterTips } = props;
	const decodedIcon = atob(categoryIcon);
	console.log(props);

	return (
		<>
			<button className="filter-bar__button" onClick={() => {filterTips("category", "67b08a41b694f84800747f6e", true)}}>
				<div
					className="filter-bar__icon"
					dangerouslySetInnerHTML={{ __html: decodedIcon }}
				/>{" "}
				<div className="filter-bar__category-title">{categoryName}</div>
			</button>
		</>
	);
}

export default FilterButton;
