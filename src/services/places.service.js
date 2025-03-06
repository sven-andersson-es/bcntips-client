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
				"X-Goog-Api-Key": `${apiKey}`,
			};

			return config;
		});
	}

	getMapsUri = (placeId) => {
		return this.api.get(`/places/${placeId}?fields=googleMapsUri`);
	};
	placesAutocomplete = (searchString) => {
		const requestBody = {
			input: `${searchString}`, //documentation: https://developers.google.com/maps/documentation/places/web-service/place-autocomplete
			locationRestriction: {
				circle: {
					center: {
						latitude: 41.39357181136263,
						longitude: 2.1644247186204675,
					},
					radius: 10000.0,
				},
			},
		};
		return this.api
			.post("/places:autocomplete", requestBody)
			.then((response) => {
				return response;
			});
	};
	getPlace = (placeId) => {
		return (
			this.api
				.get(
					`/places/${placeId}?fields=id,displayName.text,editorialSummary.text,addressComponents,googleMapsUri,location,internationalPhoneNumber`
				)
				.then((response) => {                    
					const placesObject = response.data;

                    const getAddressDetail = (addressComponents, detail) => {
                        if (addressComponents.find(e => e.types.includes(`${detail}`))) {
                            const addressDetail = addressComponents.find(e => e.types.includes(`${detail}`)).longText;
                            return addressDetail
                        } else {
                            return "";
                        }
                    }
                    
					const returnObject = {
						title: placesObject.displayName ? placesObject.displayName.text : "",
						street: getAddressDetail(placesObject.addressComponents,"route"),
						streetNo: getAddressDetail(placesObject.addressComponents,"street_number"),
						zip: getAddressDetail(placesObject.addressComponents,"postal_code"),
						city: getAddressDetail(placesObject.addressComponents,"locality"),
						telephone: placesObject.internationalPhoneNumber ? placesObject.internationalPhoneNumber.replaceAll(" ", "") : "",
						mapPlaceId: placesObject.id ? placesObject.id : "",
						googleMapsUri: placesObject.googleMapsUri,
						mapLat: placesObject.location ? placesObject.location.latitude : "",
						mapLng: placesObject.location ? placesObject.location.longitude : "",
					};
                    if (placesObject.editorialSummary) {
                            returnObject.introText = placesObject.editorialSummary.text
                    }
					return returnObject;
				})
		);
	};
}

const placesService = new PlacesService();

export default placesService;
