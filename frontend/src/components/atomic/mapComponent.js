import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const MapComponent = ({ favoriteStops }) => {
  const defaultCenter = { lat: favoriteStops[0].latitude, lng: favoriteStops[0].longitude }; 
  // Default to Boston if no stops available
    const customIcon = new L.Icon({
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });


  return (
    <MapContainer
      center={defaultCenter}
      zoom={8}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {favoriteStops.map(stop => (
        <Marker key={stop._id} position={{ lat: stop.latitude, lng: stop.longitude }} icon={customIcon}>
          <Popup>
            {stop.name} <br /> {stop.direction_name}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;