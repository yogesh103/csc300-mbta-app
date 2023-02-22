import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import generateScheduleWithVehicle from './generateScheduleWithVehicle';

const Map = () => {
  const [schedule, setSchedule] = useState(null);

  useEffect(() => {
    generateScheduleWithVehicle(routeId).then(schedule => setSchedule(schedule));
  }, [routeId]);
  
  useEffect(() => {
    if (!schedule) {
      return;
    }

    const map = L.map('map').setView([schedule.route.latitude, schedule.route.longitude], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    schedule.vehicleInfo.forEach(vehicle => {
      L.marker([vehicle.latitude, vehicle.longitude]).addTo(map)
        .bindPopup(`Vehicle: ${vehicle.label}<br>Estimated arrival time: ${vehicle.prediction}`)
    });
  }, [schedule]);

  return (
    <div>
      {schedule ? (
        <>
          <h2>Route: {schedule.route.long_name}</h2>
          <table>
            <thead>
              <tr>
                <th>Vehicle</th>
                <th>Estimated arrival time</th>
              </tr>
            </thead>
            <tbody>
              {schedule.vehicleInfo.map(vehicle => (
                <tr key={vehicle.id}>
                  <td>{vehicle.label}</td>
                  <td>{vehicle.prediction}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div id="map" style={{ height: '400px', width: '100%' }} />
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Map;
