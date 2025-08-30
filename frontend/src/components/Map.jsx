import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./map.css";

// Fix for default marker icon issue
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function MapComponent() {
  return (
    <MapContainer center={[20.5937, 78.9629]} zoom={5} className="leaflet-container">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      <Marker position={[28.6139, 77.209]}>
        <Popup>New Delhi - Example Hydrogen Plant</Popup>
      </Marker>
      <Marker position={[19.076, 72.8777]}>
        <Popup>Mumbai - Storage Hub</Popup>
      </Marker>
    </MapContainer>
  );
}

export default MapComponent;
