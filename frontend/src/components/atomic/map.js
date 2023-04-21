import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { RoutingMachine } from 'react-leaflet-routing-machine';

const Map = ({ lat, lng, zoom, destinations }) => {
  const [position, setPosition] = useState([lat, lng]);

  const handleLocationFound = (e) => {
    setPosition(e.latlng);
  };

  return (
    <MapContainer
      center={position}
      zoom={zoom}
      style={{ height: '400px' }}
      onLocationfound={handleLocationFound}
      whenReady={(map) => {
        map.locate();
      }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <RoutingMachine
        waypoints={[
          position,
          ...destinations.map((destination) => [destination.lat, destination.lng]),
        ]}
        routeWhileDragging={false}
        routerProps={{ profile: 'mapbox/driving' }}
      />

      {destinations.map((destination, index) => (
        <Marker key={index} position={[destination.lat, destination.lng]}>
          <Popup>
            <div>
              <h2>{destination.name}</h2>
              <p>{destination.description}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;