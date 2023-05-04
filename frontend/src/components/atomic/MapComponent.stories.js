import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import MapComponent from './mapComponent';

export default {
  title: 'Components/MapComponent',
  component: MapComponent,
};

const Template = (args) => (
    <div style={{ height: '500px' }}>
      <MapComponent {...args} />
    </div>
);

export const Default = Template.bind({});
Default.args = {
  favoriteStops: [
    { name: 'South Station', latitude: 42.3526, longitude: -71.0551, direction_name: 'Alewife' },
    { name: 'Park Street', latitude: 42.3564, longitude: -71.0622, direction_name: 'Ashmont/Braintree' },
    { name: 'Harvard Square', latitude: 42.3736, longitude: -71.1106, direction_name: 'Ashmont/Braintree' },
  ]
};