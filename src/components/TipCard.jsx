import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";

//CLOUDINARY
import cld from "../config/cloudinary.config";
import { AdvancedImage } from "@cloudinary/react";
import { scale } from "@cloudinary/url-gen/actions/resize";
import { format, quality } from "@cloudinary/url-gen/actions/delivery";
import { auto } from "@cloudinary/url-gen/qualifiers/format";

//CONTEXT
import { AuthContext } from "../context/auth.context";

function TipCard(props) {
	const [favourite, setFavourite] = useState(false);
	const { isLoggedIn, isLoggedInSuper } = useContext(AuthContext);
	const {
		_id,
		imageUrl,
		title,
		introText,
		barrio: { barrioName },
		category: { categoryIcon, categoryName },
		favouriteTips,
		updateFavouriteTips,
		tipsLoading
	} = props;
	//const favourite = true
	const decodedIcon = atob(categoryIcon);
	const favouriteData = { favouriteId: _id };

	const setCardFavourite = (tipId) => {
		const isFavourite = favouriteTips.find((id) => {
			return id === tipId;
		});
		setFavourite(isFavourite);
	};

	useEffect(() => {
		setCardFavourite(_id);
	}, [updateFavouriteTips]);


	

	return (
		<>
			<article className="tip-card">
				{imageUrl && (
					<div className="tip-card__image">
						<Link to={`/tip/${_id}`}>
						<AdvancedImage
									cldImg={cld
										.image(imageUrl)
										.resize(scale().width(600))
										.delivery(quality(auto()))
										.delivery(format(auto()))}
									alt={title}
								/>
						</Link>
						<div
							className="tip-card__category-icon"
							dangerouslySetInnerHTML={{ __html: decodedIcon }}
						/>
					</div>
				)}
				{!imageUrl && (
					<div className="tip-card__image-placeholder">
						<Link to={`/tip/${_id}`}>
							<img
								src="/placeholder-image.jpg"
								alt={title}
							/>
						</Link>
						<div
							className="tip-card__category-icon"
							dangerouslySetInnerHTML={{ __html: decodedIcon }}
						/>
					</div>
				)}

				<div className="tip-card__content">
					<div className="tip-card__content-layout">
						<div className="tip-card__content-layout-top">
							<div className="tip-card__title">{title}</div>
							<div className="tip-card__tag">
								<span className="tip-card__tag--barrio">{barrioName}</span>
							</div>
							<div className="tip-card__intro-text">{introText}</div>
						</div>
						<div className="tip-card__content-layout-bottom">
							<div className="tip-card__buttons">
								<Link className="btn__small--white" to={`/tip/${_id}`}>
									Read more
								</Link>
							</div>
						</div>
					</div>

					{isLoggedIn && (
						<>
							<button
								onClick={() => {
									updateFavouriteTips(_id);
								}}
								className={
									favourite
										? "tip-card__like-button--liked"
										: "tip-card__like-button"
								}
							>
								<svg
									viewBox="0 0 20 19"
									fill="currentColor"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M10.1 15.55L10 15.65L9.89 15.55C5.14 11.24 2 8.39 2 5.5C2 3.5 3.5 2 5.5 2C7.04 2 8.54 3 9.07 4.36H10.93C11.46 3 12.96 2 14.5 2C16.5 2 18 3.5 18 5.5C18 8.39 14.86 11.24 10.1 15.55ZM14.5 0C12.76 0 11.09 0.81 10 2.08C8.91 0.81 7.24 0 5.5 0C2.42 0 0 2.41 0 5.5C0 9.27 3.4 12.36 8.55 17.03L10 18.35L11.45 17.03C16.6 12.36 20 9.27 20 5.5C20 2.41 17.58 0 14.5 0Z"
										fill="currentColor"
									/>
								</svg>
							</button>
						</>
					)}
					{!isLoggedIn && (
						<>
							<Link
								to="/signup"
								state={favouriteData}
								className="tip-card__like-button"
							>
								<svg
									viewBox="0 0 20 19"
									fill="currentColor"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M10.1 15.55L10 15.65L9.89 15.55C5.14 11.24 2 8.39 2 5.5C2 3.5 3.5 2 5.5 2C7.04 2 8.54 3 9.07 4.36H10.93C11.46 3 12.96 2 14.5 2C16.5 2 18 3.5 18 5.5C18 8.39 14.86 11.24 10.1 15.55ZM14.5 0C12.76 0 11.09 0.81 10 2.08C8.91 0.81 7.24 0 5.5 0C2.42 0 0 2.41 0 5.5C0 9.27 3.4 12.36 8.55 17.03L10 18.35L11.45 17.03C16.6 12.36 20 9.27 20 5.5C20 2.41 17.58 0 14.5 0Z"
										fill="currentColor"
									/>
								</svg>
							</Link>
						</>
					)}
				</div>
			</article>
		</>
	);
}

export default TipCard;
