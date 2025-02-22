function TipCard(props) {
	console.log("card Props", props);

	const {
		title,
		introText,
		barrio: { barrioName },
	} = props;
	return (
		<>
			<article>
				{title}, {introText}, {barrioName}
			</article>
		</>
	);
}

export default TipCard;
