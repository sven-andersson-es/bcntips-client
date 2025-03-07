import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";

//SERVICES
import tipService from "../services/tip.service";
import authService from "../services/auth.service";
import placesService from "../services/places.service";

//CONTEXT
import { AuthContext } from "../context/auth.context";

function TipDetailPage() {
	const { isLoggedIn, isLoggedInSuper } = useContext(AuthContext);
	const [favourite, setFavourite] = useState(false);
	const { tipId: detailTipId } = useParams();

	const [favouriteTips, setFavouriteTips] = useState(null);
	const [tip, setTip] = useState({});
	const [loadingTip, setLoadingTip] = useState(true);
	//const [mapPlaceUri, setMapPlaceUri] = useState("https://maps.google.com");

	const getTip = (tipId) => {
		tipService
			.getTip(tipId)
			.then((response) => {
				setTip(response.data);
				setLoadingTip(false);
				return response.data;
			})
			.then((data) => {
				getFavouriteTips();
				//getMapsUri(data.mapPlaceId)
			})
			.catch((error) => console.log(error));
	};

	const getFavouriteTips = () => {
		authService
			.getFavourites()
			.then((response) => {
				setFavouriteTips(response.data.favouriteTips);
				return response.data.favouriteTips;
			})
			.then((favouriteTips) => {
				const setCardFavourite = (tipId) => {
					const isFavourite = favouriteTips.find((id) => {
						return id === tipId;
					});
					setFavourite(isFavourite);
				};
				setCardFavourite(detailTipId);
			});
	};

	const updateFavouriteTips = (tipId) => {
		authService.updateFavourites(tipId).then((response) => {
			setFavouriteTips(response.data);
			getFavouriteTips();
		});
	};

	const getMapsUri = (mapPlaceId) => {
		placesService.getMapsUri(mapPlaceId).then((response) => {
			setMapPlaceUri(response.data.googleMapsUri);
		});
	};

	useEffect(() => {
		getTip(detailTipId);
	}, []);

	return (
		!loadingTip && (
			<>
				<section className="max-width-container detail-page">
					<article className="detail-page">
						{isLoggedInSuper && (
							<>
								<div className="detail-page__edit-buttons">
									<Link
										to={`/tip/update/${tip._id}`}
										className="detail-page__edit-button btn--inline"
									>
										Edit tip
									</Link>
									<Link
										to={`/tip/update/${tip._id}`}
										className="detail-page__delete-button btn--inline"
									>
										Delete tip
									</Link>
								</div>
							</>
						)}

						{tip.imageUrl && (
							<div className="detail-page__image">
								<img src={tip.imageUrl} alt={tip.title} />
								<div
									className="detail-page__category-icon"
									dangerouslySetInnerHTML={{
										__html: atob(tip.category.categoryIcon),
									}}
								/>
							</div>
						)}
						{!tip.imageUrl && (
							<div className="detail-page__image-placeholder">
								<img src="/placeholder-image.jpg" alt={tip.title} />
								<div
									className="detail-page__category-icon"
									dangerouslySetInnerHTML={{
										__html: atob(tip.category.categoryIcon),
									}}
								/>
							</div>
						)}

						<div className="detail-page__content">
							<div className="detail-page__title">
								<h1>{tip.title}</h1>
							</div>
							<address className="detail-page__address">
								{tip.street}, {tip.streetNo}
								<br />
								{tip.zip}, {tip.city}
								<br />
							</address>
							<div className="detail-page__tag">
								<span className="detail-page__tag--barrio">
									{tip.barrio.barrioName}
								</span>
							</div>
							<div className="detail-page__google-button">
								<a
									href={
										tip.googleMapsUri
											? tip.googleMapsUri
											: "https://maps.google.com"
									}
									className="btn--inverted"
								>
									Get directions on Google Maps
								</a>
							</div>
							<div className="detail-page__intro-text">{tip.introText}</div>
							<div className="detail-page__body-text">{tip.bodyText}</div>

							{isLoggedIn && (
								<>
									<button
										onClick={() => {
											updateFavouriteTips(tip._id);
										}}
										className={
											favourite
												? "detail-page__like-button--liked"
												: "detail-page__like-button"
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
										state={{ favouriteId: tip._id }}
										className="detail-page__like-button"
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
				</section>
			</>
		)
	);
}

export default TipDetailPage;
