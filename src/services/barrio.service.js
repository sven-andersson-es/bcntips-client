import axios from "axios";

class BarrioService {
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

	createBarrio = (requestBody) => {
		return this.api.post("/api/barrios", requestBody);
	};

	getAllBarrios = () => {
		return this.api.get("/api/barrios");
	};

	getBarrio = (barrioId) => {
		return this.api.get(`/api/barrios/${barrioId}`);
	};

	updateBarrio = (barrioId, requestBody) => {
		return this.api.put(`/api/barrios/${barrioId}`, requestBody);
	};

	deleteBarrio = (barrioId) => {
		return this.api.delete(`/api/barrios/${barrioId}`);
	};
}

const barrioService = new BarrioService();

export default barrioService;
