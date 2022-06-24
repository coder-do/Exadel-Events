import React, { useRef, useEffect, useState, MutableRefObject } from "react";
import { FormInstance } from "antd";
import { useLocation } from "react-router-dom";
import mapboxgl from "mapbox-gl";
import "./style.sass";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN!;

interface IMapProps {
	address: string;
	setAddress?: (address: string) => void;
	form?: FormInstance;
}

const Map: React.FC<IMapProps> = ({ address, setAddress, form }) => {
	const mapContainerRef: MutableRefObject<any> = useRef(null);
	const location = useLocation();
	let coordinates: {
		lat: number;
		lng: number;
		zoom: number;
	};
	const [lng, setLng] = useState(+address?.split(",")[0] || 0);
	const [lat, setLat] = useState(+address?.split(",")[1] || 0);
	const [zoom, setZoom] = useState(+address?.split(",")[2] || 0);

	useEffect(() => {
		if (address) {
			coordinates = {
				lat: +address.split(", ")[1],
				lng: +address.split(", ")[0],
				zoom: +address.split(", ")[2],
			};
			setLng(coordinates.lng);
			setLat(coordinates.lat);
			setZoom(coordinates.zoom);
		}

		let map = new mapboxgl.Map({
			container: mapContainerRef.current,
			style: "mapbox://styles/mapbox/streets-v11",
			center: !address ? [lng, lat] : [coordinates.lng, coordinates.lat],
			zoom: zoom,
		});

		const path: string[] = location.pathname.split("/");
		if (
			!address ||
			path.includes("update") ||
			!path.includes("details") ||
			path.includes("add")
		) {
			map.addControl(new mapboxgl.NavigationControl(), "top-right");

			map.on("move", () => {
				setLng(+map.getCenter().lng.toFixed(4));
				setLat(+map.getCenter().lat.toFixed(4));
				setZoom(+map.getZoom().toFixed(2));
				typeof setAddress !== "undefined" &&
					setAddress(`${lng}, ${lat}, ${zoom}`.trim());
			});
		}

		return () => map.remove();
	}, []);

	useEffect(() => {
		typeof setAddress !== "undefined" &&
			setAddress(`${lng}, ${lat}, ${zoom}`.trim());
		form?.setFieldsValue({
			address: address,
		});
	}, [lng, lat, zoom]);

	return (
		<div>
			<div className="sidebarStyle">
				<code>
					Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
				</code>
			</div>
			<div className="map-container" ref={mapContainerRef} />
		</div>
	);
};

export default Map;
