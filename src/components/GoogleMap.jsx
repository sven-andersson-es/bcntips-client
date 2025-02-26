import {
	APIProvider,
	Map,
} from "@vis.gl/react-google-maps";

//COMPONENTS
import GoggleMapMarker from "./GoogleMapMarker";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function GoogleMap(props) {
	const { tips } = props;

	return (
		<section className="full-width-container map">
			<APIProvider apiKey={API_KEY}>
				<Map
					style={{ width: "100%", height: "20rem" }}
					defaultCenter={{ lat: 41.39357181136263, lng: 2.1644247186204675 }}
					defaultZoom={13}
					mapId={"e697e4583aa87545"}
					renderingType={"VECTOR"}
					gestureHandling={"greedy"}
					disableDefaultUI={true}
					defaultHeading={316.5}
				>
					{tips.map((tip) => (
						<GoggleMapMarker key={tip._id} {...tip} />
					))}
				</Map>
			</APIProvider>
		</section>
	);
}

export default GoogleMap;
