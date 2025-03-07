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
	const [tipsLoading, setTipsLoading] = useState(true);
	const [filterObject, setFilterObject] = useState({
		category: [],
		barrio: [],
	});
	const [filter, setFilter] = useState("");
	const getAllTips = (filter) => {
		setTipsLoading(true);
		tipService
			.getAllTips(filter)
			.then((response) => {
				setTips(response.data);
				setTipsLoading(false);
			})
			.catch((error) => console.log(error));
	};

	const filterTips = (type, id, action) => {
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

		setFilterObject(newFilterObject);

		const queryStrings = new URLSearchParams(newFilterObject);
		setFilter(queryStrings.toString());
	};

	const getFavouriteTips = () => {
		authService.getFavourites().then((response) => {
			setFavouriteTips(response.data.favouriteTips);
		});
	};

	const updateFavouriteTips = (tipId) => {
		authService.updateFavourites(tipId).then((response) => {
			setFavouriteTips(response.data);
		});
	};
	useEffect(() => {
		if (!authIsLoading) {
			getAllTips(filter);
			if (isLoggedIn) {
				getFavouriteTips();
			}
		}
	}, [filter, authIsLoading, isLoggedIn]);

	return (
		<>
			<GoogleMap tips={tips} />
			<FilterBar filterTips={filterTips} />
			{tipsLoading && (
				<div className="loader__placeholder">
					<div className="loader__spinner--grey"></div>
				</div>
			)}
			{!tipsLoading && (
				<TipList
					tips={tips}
					favouriteTips={favouriteTips}
					updateFavouriteTips={updateFavouriteTips}
					tipsLoading={tipsLoading}
				/>
			)}
		</>
	);
}

export default HomePage;
