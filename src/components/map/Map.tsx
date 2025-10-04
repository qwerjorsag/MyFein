// MapComponent.tsx
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"; // Import Leaflet components
import L from "leaflet"; // Import Leaflet for handling custom icons (optional)
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS

// Fix the Leaflet default marker icon

L.Icon.Default.mergeOptions({
    iconUrl: require("leaflet/dist/images/marker-icon.png"), // Correct path to marker-icon.png
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"), // Correct path to marker-icon-2x.png
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"), // Correct path to marker-shadow.png
});

interface MapComponentProps {
    location: { lat: number; lng: number };
    shopname: string;
}

const MapComponent: React.FC<MapComponentProps> = ({ location, shopname }) => {
    return (
        <div className="branch-detail__map">
            {/*<h2>Location on Map</h2>*/}
            <MapContainer
                center={location}
                zoom={15}
                style={{ width: "100%", height: "400px" }}
            >
                {/* TileLayer from OpenStreetMap */}
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {/* Marker for the branch location */}
                <Marker position={location}>
                    <Popup>{shopname}</Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default MapComponent;
