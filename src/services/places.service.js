import axios from "axios";

class PlacesService {
	constructor() {
		this.api = axios.create({
			baseURL: import.meta.env.VITE_GOOGLE_PLACES_BASE_URL,
		});

		// Axio intercept function
		this.api.interceptors.request.use((config) => {
			const apiKey = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;

			config.headers = {
				"X-Goog-Api-Key": `${apiKey}`
			};

			return config;
		});
	}

	getMapsUri = (placeId) => {
		return this.api.get(`/places/${placeId}?fields=googleMapsUri`);
	};

	
}

const placesService = new PlacesService();

export default placesService;
