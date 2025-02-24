function TipCard(props) {
	console.log("card Props", props);

	const {
		title,
		introText,
		barrio: { barrioName },
		category: { categoryIcon, categoryName },
	} = props;
	const decodedIcon = atob(categoryIcon);
	return (
		<>
			<article className="tip-card">
				<div className="tip-card__image">
				<img src="https://media-cdn.tripadvisor.com/media/photo-s/07/fe/a5/66/catacroquet.jpg" alt={title} />
					<div
						className="tip-card__category-icon"
						dangerouslySetInnerHTML={{ __html: decodedIcon }}
					/>
				</div>
				<div className="tip-card__content">
					<div className="tip-card__title">{title}</div>
					<div className="tip-card__intro-text">{introText}</div>
					<div className="tip-card__tag">
						<span className="tip-card__tag--barrio">{barrioName}</span>
					</div>
					<button className="tip-card__like-button"></button>
				</div>
			</article>
		</>
	);
}

export default TipCard;
