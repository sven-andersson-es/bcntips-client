//HOOKS
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

//SERVICES
import tipService from "../services/tip.service";
import barrioService from "../services/barrio.service";
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
		user: "67b9ca9c0fc9aa49dbb884e9", //Add this id from the active user
	};
	const { tipId } = useParams();
	const [create, setCreate] = useState(true);
	const [form, setForm] = useState(tipColumns);
	const [tip, setTip] = useState({});
	const [categories, setCategories] = useState([]);
	const [barrios, setBarrios] = useState([]);
	const pageLocation = useLocation();
	console.log(tipId);

	const formMode = () => {
		if (pageLocation.pathname.includes("tip/update") && tipId) {
			setCreate(false);
			getTip(tipId);
		}
	};

	const getAllCategories = () => {
		categoryService
			.getAllCategories()
			.then((response) => setCategories(response.data))
			.catch((error) => console.log(error));
	};

	const getAllBarrios = () => {
		barrioService
			.getAllBarrios()
			.then((response) => setBarrios(response.data))
			.catch((error) => console.log(error));
	};

	const getTip = (id) => {
		console.log("get tip running");

		tipService
			.getTip(id)
			.then((response) => {
				console.log(response.data);
				const repsonseTip = response.data;
				const responseObject = {
					title: repsonseTip.title,
					introText: repsonseTip.introText,
					bodyText: repsonseTip.bodyText,
					street: repsonseTip.street,
					streetNo: repsonseTip.streetNo,
					zip: repsonseTip.zip,
					city: repsonseTip.city,
					mapPlaceId: repsonseTip.mapPlaceId,
					mapLat: repsonseTip.mapLat.$numberDecimal,
					mapLng: repsonseTip.mapLng.$numberDecimal,
					category: repsonseTip.category._id,
					barrio: repsonseTip.barrio._id,
					user: repsonseTip.user._id,
				};

				setForm(responseObject);
			})
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
		const tipObject = {
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
		if (create) {
			createTip(tipObject);
		} else {
			//updateTip(id,tipObject)
		}
	};

	useEffect(() => {
		formMode();
		getAllCategories();
		getAllBarrios();
	}, []);

	return (
		<>
			<section className="max-width-container">
				<div className="form">
					<h1>{create ? "Add a new tip" : "Edit tip: " + form.title}</h1>
					<form onSubmit={handleSubmit}>
						<input type="hidden" value={form.user} name="user" id="user" />
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
									value={form.mapLng}
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
							<div className="form__group">
								<label htmlFor="barrio">Barrio</label>
								<select
									onChange={handleInput}
									name="barrio"
									id="barrio"
									value={form.barrio}
									required
								>
									<option value="">--Choose a barrio--</option>
									{barrios.map((barrio) => {
										return (
											<option key={barrio._id} value={barrio._id}>
												{barrio.barrioName}
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
