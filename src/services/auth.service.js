import axios from "axios";

class AuthService {
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

	login = (requestBody) => {
		return this.api.post("/auth/login", requestBody);
	};

	signup = (requestBody) => {
		return this.api.post("/auth/signup", requestBody);
	};

	verify = () => {
		return this.api.get("/auth/verify");
	};

	getUserByUserId = (userId) => {
		return this.api.get(`/users/${userId}`);
	};

	getFavourites = () => {
		return this.api.get("/auth/favourites");
	};
	updateFavourites = (tipId) => {
		return this.api.put(`/auth/favourites/${tipId}`);
	};

}

const authService = new AuthService();

export default authService;
