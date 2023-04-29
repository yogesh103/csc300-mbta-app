import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../atomic/loading';
import TrainCard from '../atomic/trainCard';

const TrainsNearby = () => {
const [location, setLocation] = useState(null);
const [origin, setOrigin] = useState(null);
const [stations, setStations] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [destinations, setDestinations] = useState([]);

const fetchLocation = async () => {
  try {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    const { latitude, longitude } = position.coords;
    setLocation({ latitude, longitude });
    getTrainStations({ latitude, longitude });
  } catch (error) {
    setError(error.message);
    setLoading(false);
  }
};
useEffect(() => {
  fetchLocation();
  const intervalId = setInterval(() => {
    fetchLocation();
  }, 1 * 60 * 1000); // Fetch data every 1 minute
  return () => clearInterval(intervalId);
}, []);

  const getTrainStations = async ({ latitude, longitude }) => {
    const url = 'http://localhost:9000/train/nearby'
    try {
      const stationsWithPredictionsAndRoutes = await axios.get(`${url}?longitude=${longitude}&latitude=${latitude}`);
      setTimeout(() => {
        setStations(stationsWithPredictionsAndRoutes.data);
        console.log(stationsWithPredictionsAndRoutes);
        const destinationsRaw = stationsWithPredictionsAndRoutes.data.map((station) => {
          return {
            lat: station.attributes.latitude,
            lng: station.attributes.longitude,
            name: station.attributes.name,
            description: station.attributes.address,
          };
        });
        setDestinations(destinationsRaw);
        setOrigin({lat: latitude, lng: longitude});
        setLoading(false);
      }, 500);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <h1>Trains Near You</h1>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {stations.map((station) => (
            station.predictions.map((prediction) => (
              <TrainCard
                key={prediction.id}
                name={prediction.route.attributes.long_name}
                timeInMinutes= {prediction.timeInMinutes}
                direction={`Towards ${prediction.route.attributes.direction_destinations[prediction.attributes.direction_id]}`}
                stopName={station.attributes.name}
                drivingTimeInMinutes={station.drivingTimeInMinutes}
                walkingTimeInMinutes={station.walkingTimeInMinutes}
                backgroundColor={prediction.route.attributes.color}
              />
            ))
        ))}
      </div>
    </div>
  );
};

export default TrainsNearby;
