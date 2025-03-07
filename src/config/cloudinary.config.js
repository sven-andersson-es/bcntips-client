import { Cloudinary } from "@cloudinary/url-gen";

const cld = new Cloudinary({
	cloud: {
		cloudName: import.meta.env.VITE_CLOUDINARY_NAME,
		apiKey: import.meta.env.VITE_CLOUDINARY_KEY,
		cloudSecret: import.meta.env.VITE_CLOUDINARY_SECRET,
	},
});

export default cld;
