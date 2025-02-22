import axios from "axios";

class CategoryService {
	constructor() {
		this.api = axios.create({
			baseURL: import.meta.env.SERVER_URL || "http://localhost:5005",
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

	createCategory = (requestBody) => {
		return this.api.post("/api/categories", requestBody);
	};

	getAllCategories = () => {
		return this.api.get("/api/categories");
	};

	getCategory = (cagegoryId) => {
		return this.api.get(`/api/categories/${cagegoryId}`);
	};

	updateCategory = (cagegoryId, requestBody) => {
		return this.api.put(`/api/categories/${cagegoryId}`, requestBody);
	};

	deleteCategory = (cagegoryId) => {
		return this.api.delete(`/api/categories/${cagegoryId}`);
	};
}

const categoryService = new CategoryService();

export default categoryService;
