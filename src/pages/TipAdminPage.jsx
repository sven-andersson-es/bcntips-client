//HOOKS
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//SERVICES
import tipService from "../services/tip.service";
//import barrioService from "../services/barrio.service";
import categoryService from "../services/category.service";

function TipAdminPage() {
	/* 
	
	{

    "title": "SandwiChez Bruniquer",
    "introText": "Here you can have a coffee and something to eat. Laptop friendly.",
    "bodyText": "",
    "street": "Carrer de Bruniquer",
    "streetNo": "33, 35",
    "zip": "08024",
    "city": "Barcelona",
    "mapPlaceId": "ChIJXWFTsPGjpBIR49n2OILFREw",
    "mapLat": 41.405195888198065,
    "mapLng": 2.1611619450403854,
    "category": "67b9c230f3a05961df985783",
    "barrio": "67b9c230f3a05961df985783",
    "user": "67b9ca9c0fc9aa49dbb884e9"

	}

	*/

	const tipColumns = {
		title: "",
		introText: "",
		bodyText: "",
		street: "",
		streetNo: "",
		zip: "",
		city: "",
		mapPlaceId: "",
		mapLat: 0,
		mapLng: 0,
		category: "",
		barrio: "",
		user: "",
	};
	const { tipId } = useParams();
	const [form, setForm] = useState(tipColumns);
	const [adminNew, setAdminNew] = useState(true);
	const [tip, setTip] = useState({});
	const [categories, setCategories] = useState([]);
	//const [barrios, setBarrios] = useState([]);

	const getAllCategories = () => {
		categoryService
			.getAllCategories()
			.then((response) => setCategories(response.data))
			.catch((error) => console.log(error));
	};

	/* const getAllCategories = () => {
		categoryService
			.getAllCategories()
			.then((response) => setCategories(response.data))
			.catch((error) => console.log(error));
	}; */

	const getTip = (id) => {
		tipService
			.getTip(id)
			.then((response) => setTip(response.data))
			.catch((error) => console.log(error));
	};

	const createTip = (object) => {
		tipService
			.createTip(object)
			.then((response) => setTip(response.data))
			.catch((error) => console.log(error));
	};
	const updateTip = (id, object) => {
		updateTip
			.createTip(id, object)
			.then((response) => setTip(response.data))
			.catch((error) => console.log(error));
	};

	const handleInput = (event) => {
		const value = event.target.value;
		setForm({
			...form,
			[event.target.name]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const editProduct = {
			title: form.title,
			introText: form.introText,
			bodyText: form.bodyText,
			street: form.street,
			streetNo: form.streetNo,
			zip: form.zip,
			city: form.city,
			mapPlaceId: form.mapPlaceId,
			mapLat: form.mapLat,
			mapLng: form.mapLng,
			category: form.category,
			barrio: form.barrio,
			user: form.user,
		};
		if (productForm.show === "edit") {
			updateProduct(form.id, editProduct);
		}
		if (productForm.show === "add") {
			addProduct(editProduct);
		}
	};

		useEffect(() => {
		getAllCategories();
		// if (productForm.show === "edit") {
		// 	getProduct(productForm.id);
		// }
	}, []);

	return (
		<>
			<section className="max-width-container">
				<div className="form">
					<h1>{adminNew ? "Add a new tip" : "Edit tip: " + form.title}</h1>
					<form onSubmit={handleSubmit}>
						{form.id && <input value={form.id} name="id" type="hidden" />}

						<section className="form__section">
							<div className="form__group">
								<label htmlFor="title">Title</label>
								<input
									value={form.title}
									onChange={handleInput}
									name="title"
									id="title"
									type="text"
									placeholder="The name of the place"
									required
								/>
							</div>
							<div className="form__group">
								<label htmlFor="title">Intro text</label>
								<input
									value={form.introText}
									onChange={handleInput}
									name="introText"
									id="introText"
									type="text"
									placeholder="Intro text"
									required
								/>
							</div>
							<div className="form__group">
								<label htmlFor="description">Description</label>
								<textarea
									value={form.bodyText}
									onChange={handleInput}
									name="bodyText"
									id="bodyText"
									type="text"
									placeholder="A longer description of the place"
									rows="5"
								/>
							</div>
							<div className="form__group">
								<label htmlFor="title">Street</label>
								<input
									value={form.street}
									onChange={handleInput}
									name="street"
									id="street"
									type="text"
									placeholder="Street name"
									required
								/>
							</div>
							<div className="form__group">
								<label htmlFor="title">Street number</label>
								<input
									value={form.streetNo}
									onChange={handleInput}
									name="streetNo"
									id="streetNo"
									type="text"
									placeholder="Street number"
									required
								/>
							</div>
							<div className="form__group">
								<label htmlFor="title">Zip number</label>
								<input
									value={form.zip}
									onChange={handleInput}
									name="zip"
									id="zip"
									type="text"
									placeholder="Zip number"
									required
								/>
							</div>
							<div className="form__group">
								<label htmlFor="title">City</label>
								<input
									value={form.city}
									onChange={handleInput}
									name="city"
									id="city"
									type="text"
									placeholder="City"
									required
								/>
							</div>
							<div className="form__group">
								<label htmlFor="title">Google Map Place ID</label>
								<input
									value={form.mapPlaceId}
									onChange={handleInput}
									name="mapPlaceId"
									id="mapPlaceId"
									type="text"
									placeholder="Map Place ID"
									required
								/>
							</div>
							<div className="form__group">
								<label htmlFor="title">Latitude</label>
								<input
									value={form.mapLat}
									onChange={handleInput}
									name="mapLat"
									id="mapLat"
									type="number"
									placeholder="Latitude"
									required
								/>
							</div>
							<div className="form__group">
								<label htmlFor="title">Longitude</label>
								<input
									value={form.mapLat}
									onChange={handleInput}
									name="mapLng"
									id="mapLng"
									type="number"
									placeholder="Longitude"
									required
								/>
							</div>
							<div className="form__group">
								<label htmlFor="category">Category</label>
								<select
									onChange={handleInput}
									name="category"
									id="category"
									value={form.category}
									required
								>
									<option value="">--Choose a category--</option>
									{categories.map((category) => {
										return (
											<option key={category._id} value={category._id}>
												{category.categoryName}
											</option>
										);
									})}
								</select>
							</div>
						</section>
						<section className="form__section">
							<button type="submit" className="btn">
								Save
							</button>
						</section>
					</form>
				</div>
			</section>
		</>
	);
}
export default TipAdminPage;
