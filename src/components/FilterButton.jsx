function FilterButton(props) {
	const { categoryName, categoryIcon } = props;
	const decodedIcon = atob(categoryIcon);
	console.log(props);

	return (
		<>
			<button className="filter-bar__button">
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
