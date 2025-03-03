import axios from "axios";

class TipService {
	constructor() {
		this.api = axios.create({
			baseURL: import.meta.env.VITE_BCNTIPS_API_BASE_URL,
		});

		// Axio intercept function
		this.api.interceptors.request.use((config) => {
			const storedToken = localStorage.getItem("authToken");

			if (storedToken) {
				config.headers = { Authorization: `Bearer ${storedToken}` };
			}

			return config;
		});
	}

	createTip = (requestBody) => {
		return this.api.post("/api/tips", requestBody);
	};

	// getAllTips = (filter) => {
	// 	return this.api.get(`/api/tips?category=12341%2C12342%2C12343&barrio=22341%2C22342`);
	// };
	getAllTips = (filter) => {
		//console.log("filter in the service: ", filter);
		
		return this.api.get(`/api/tips${filter ? "?"+filter : ""}`);
	};

	getTip = (tipId) => {
		return this.api.get(`/api/tips/${tipId}`);
	};

	updateTip = (tipId, requestBody) => {
		return this.api.put(`/api/tips/${tipId}`, requestBody);
	};

	deleteTip = (tipId) => {
		return this.api.delete(`/api/tips/${tipId}`);
	};
}

const tipService = new TipService();

export default tipService;
