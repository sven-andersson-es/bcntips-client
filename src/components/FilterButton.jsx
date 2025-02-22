function FilterButton(props) {
	const { categoryName, categoryIcon } = props;
	const decodedIcon = atob(categoryIcon);
	console.log(props);

	return (
		<>
			<button><div dangerouslySetInnerHTML={{ __html: decodedIcon }}/> {categoryName}</button>
		</>
	);
}

export default FilterButton;
