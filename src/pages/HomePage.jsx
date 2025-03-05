import { useState, useEffect, useContext } from "react";

//COMPONENTS
import GoogleMap from "../components/GoogleMap";
import TipList from "../components/TipList";
import FilterBar from "../components/FilterBar";

//SERVICES
import tipService from "../services/tip.service";
import authService from "../services/auth.service";

//CONTEXT
import { AuthContext } from "../context/auth.context";

function HomePage() {
	const { isLoading: authIsLoading, isLoggedIn } = useContext(AuthContext);

	const [favouriteIsLoading, setFavouriteLoading] = useState(true);
	const [favouriteTips, setFavouriteTips] = useState([]);

	const [tips, setTips] = useState([]);
	const [filterObject, setFilterObject] = useState({
		category: [],
		barrio: [],
	});
	const [filter, setFilter] = useState("");
	const getAllTips = (filter) => {
		tipService
			.getAllTips(filter)
			.then((response) => {
				if (isLoggedIn) {
					const getTipsWithFavourites = async () => {
						const favourites = await getFavouriteTips();
						// return getFavouriteTips()
						console.log("favourites ", favourites);

						const tipsWithFavourites = response.data.map((tip) => {
							let favourite = false;
							if (tip._id.indexOf(favourites)) {
								favourite = true;
							}
							return { ...tip, favourite };
						});
						setTips(tipsWithFavourites);
						console.log(tipsWithFavourites);
					};
					getTipsWithFavourites();
				} else {
					setTips(response.data);
				}
			})
			// .then(la response del getFaovouritetips)
			.catch((error) => console.log(error));
	};

	const filterTips = (type, id, action) => {
		//console.log("filterObject: ", filterObject);

		let newFilterObject = filterObject;
		if (action) {
			if (newFilterObject[type].indexOf(id) === -1) {
				newFilterObject[type].push(id);
			}
		} else {
			if (newFilterObject[type].indexOf(id) != -1) {
				const reducedArray = newFilterObject[type].filter((item) => item != id);
				newFilterObject = { ...newFilterObject, [type]: reducedArray };
			}
		}
		//console.log("newFilterObject: ", newFilterObject);

		setFilterObject(newFilterObject);

		const queryStrings = new URLSearchParams(newFilterObject);
		setFilter(queryStrings.toString());

		//console.log("queryStrings: ", queryStrings.toString());
	};

	const getFavouriteTips = () => {
		if (isLoggedIn) {
			authService.getFavourites().then((response) => {
				return response.data.favouriteTips;
			});
		} else {
			return [];
		}
	};

	const updateFavouriteTips = (tipId) => {
		authService.updateFavourites(tipId).then((response) => {
			setFavouriteTips(response);
		});
	};
	useEffect(() => {
		if (!authIsLoading) {
			getAllTips(filter);
		}
	}, [filter, authIsLoading]);

	return (
		<>
			<GoogleMap tips={tips} />
			<FilterBar filterTips={filterTips} />
			<TipList tips={tips} updateFavouriteTips={updateFavouriteTips} />
		</>
	);
}

export default HomePage;
