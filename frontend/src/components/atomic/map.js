import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { RoutingMachine } from 'leaflet-routing-machine';

function Map({ lat, lng, zoom, destinations }) {
    const [position, setPosition] = useState([lat, lng]);
    const mapRef = useRef(null);

    const handleLocationFound = (e) => {
        setPosition(e.latlng);
    };

    useEffect(() => {
        const map = mapRef.current;
        if (map) {
            map.locate();
        }
    }, [mapRef.current]);

    return (
        <MapContainer
            center={position}
            zoom={zoom}
            style={{ height: '400px' }}
            ref={mapRef}
            whenReady={() => {
                const map = mapRef.current;
                if (map) {
                    map.locate();
                }
            }}
            onLocationfound={handleLocationFound}
        >
            {/* <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}

            {/* <RoutingMachine
                waypoints={[
                    position,
                    ...destinations.map((destination) => [destination.lat, destination.lng]),
                ]}
                routeWhileDragging={false}
                routerProps={{ profile: 'mapbox/driving' }} /> */}

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
}

export default Map;