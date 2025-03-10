import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
	AdvancedMarker,
	Pin,
	InfoWindow,
	useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";

function GoggleMapMarker(props) {
	const [infowindowOpen, setInfowindowOpen] = useState(false);
	const [markerRef, marker] = useAdvancedMarkerRef();

	const decodedIcon = atob(props.category.categoryIcon);
	return (
		<>
			<AdvancedMarker className="map__marker"
				ref={markerRef}
				onClick={() => setInfowindowOpen(true)}
				position={{
					lat: Number(props.mapLat.$numberDecimal),
					lng: Number(props.mapLng.$numberDecimal),
				}}
				title={props.title}
			>
				<Pin
					background={"#222222"}
					borderColor={"#222222"}
					glyphColor={"#ffffff"}
                    scale={1.2}
				>
					<div
						className="map__category-icon"
						dangerouslySetInnerHTML={{ __html: decodedIcon }}
					/>
				</Pin>
			</AdvancedMarker>
			{infowindowOpen && (
				<InfoWindow
				headerContent={<h3>{props.title}</h3>}
                className="map__info-window"
					anchor={marker}
					maxWidth={260}
					onCloseClick={() => setInfowindowOpen(false)}
				>
                    <p>{props.introText}</p>
					<p className="read-more"><Link to={`/tip/${props._id}`}>Read more</Link></p>
				</InfoWindow>
			)}
		</>
	);
}

export default GoggleMapMarker;
