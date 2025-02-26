import React, { useState } from "react";
import {
	AdvancedMarker,
	Pin,
	InfoWindow,
	useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";

function GoggleMapMarker(props) {
	const [infowindowOpen, setInfowindowOpen] = useState(false);
	const [markerRef, marker] = useAdvancedMarkerRef();

	console.log("marker props ", props);
	const decodedIcon = atob(props.category.categoryIcon);
	return (
		<>
			<AdvancedMarker
				ref={markerRef}
				onClick={() => setInfowindowOpen(true)}
				position={{
					lat: Number(props.mapLat.$numberDecimal),
					lng: Number(props.mapLng.$numberDecimal),
				}}
				title={props.title}
			>
				<Pin
					background={"#22ccff"}
					borderColor={"#1e89a1"}
					glyphColor={"#0f677a"}
				>
					<div
						//className="tip-card__category-icon"
						dangerouslySetInnerHTML={{ __html: decodedIcon }}
					/>
				</Pin>
			</AdvancedMarker>
			{infowindowOpen && (
				<InfoWindow
                className="test"
					anchor={marker}
					maxWidth={200}
					onCloseClick={() => setInfowindowOpen(false)}
				>
					<h2>{props.title}</h2>
                    <p>{props.introText}</p>
				</InfoWindow>
			)}
		</>
	);
}

export default GoggleMapMarker;
