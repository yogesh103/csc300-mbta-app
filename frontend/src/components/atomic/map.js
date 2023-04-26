import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
// import { RoutingMachine } from 'leaflet-routing-machine';

function Map({ lat, lng, zoom, destinations }) {
    const [position] = useState([lat, lng]);
    return (
        <MapContainer
            center={position}
            zoom={zoom}
            style={{ height: '400px' }}
            zoomControl={true}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {/* <RoutingMachine
                waypoints={[
                    position,
                    ...destinations.map((destination) => [destination.lat, destination.lng]),
                ]}
                routeWhileDragging={false}
                routerProps={{ profile: 'mapbox/driving' }} /> */}

            {/* {destinations.map((destination) => (
                <Marker key={destination.id} position={[destination.lat, destination.lng]}>
                    <Popup>
                        <div>
                            <h2>{destination.name}</h2>
                            <p>{destination.description}</p>
                        </div>
                    </Popup>
                </Marker>
            ))} */}
            <ZoomControl position="bottomright" />
        </MapContainer>
    );
}

export default Map;
