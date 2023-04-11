import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../atomic/loading';
import TrainCard from '../atomic/trainCard';

const TrainsNearby = () => {
const [location, setLocation] = useState(null);
const [stations, setStations] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

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
    try {
      const response = await axios.get(
        `https://api-v3.mbta.com/stops?api_key=7a7e1f522aab4d40a5adb24bf979a5a7&filter[latitude]=${latitude}&filter[longitude]=${longitude}&filter[radius]=0.08&filter[route_type]=0,2`
      );
      const stations = response.data.data;
  
      // Make a separate request for the predictions for each station
      const predictionRequests = stations.map((station) =>
        axios.get(`https://api-v3.mbta.com/predictions?api_key=7a7e1f522aab4d40a5adb24bf979a5a7&filter[stop]=${station.id}`)
      );
      const predictionResponses = await Promise.all(predictionRequests);
      const predictionsByStationId = predictionResponses.reduce(
        (accumulator, response) => {
          const predictions = response.data.data;
          const stationId = predictions[0]?.relationships?.stop?.data?.id;
          if (stationId) {
            accumulator[stationId] = predictions;
          }
          return accumulator;
        },
        {}
      );
  
      // Make a request for the routes of all the trains
     const routeIds = Object.values(predictionsByStationId).flatMap((predictions) =>
        predictions.map((prediction) => prediction.relationships.route.data.id)
      );
      const routeRequests = Array.from(new Set(routeIds)).map((routeId) =>
        axios.get(`https://api-v3.mbta.com/routes/${routeId}?api_key=7a7e1f522aab4d40a5adb24bf979a5a7`)
      );
      const routeResponses = await Promise.all(routeRequests);
      console.log(routeResponses);
      const routesById = routeResponses.reduce((accumulator, response) => {
        const route = response.data.data;
        accumulator[route.id] = route;
        return accumulator;
      }, {});

      console.log(routesById);
      // Combine the station, prediction, and route data
      const stationsWithPredictionsAndRoutes = stations.map((station) => {
        const predictions = predictionsByStationId[station.id] || [];
        const predictionsWithRoutes = predictions.map((prediction) => ({
          ...prediction,
          route: routesById[prediction.relationships.route.data.id],
        }));
        return {
          ...station,
          predictions: predictionsWithRoutes,
        };
      });
  
      setTimeout(() => {
        setStations(stationsWithPredictionsAndRoutes);
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
    <div>
      <div className="container">
      <h1>Trains Near You</h1>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {stations.map((station) => (
            station.predictions.map((prediction) => (
              <div key={station.id + prediction.id} className="col">
                <TrainCard
                  key={prediction.id}
                  name={prediction.route.attributes.long_name}
                  timeInMinutes={Math.floor((new Date(prediction.attributes.arrival_time ?? prediction.attributes.departure_time ) - Date.now()) / (1000 * 60))}
                  direction={`Towards ${prediction.route.attributes.direction_destinations[prediction.attributes.direction_id]}`}
                  stopName={station.attributes.name}
                  backgroundColor={prediction.route.attributes.color}
                />
              </div>
            ))
        ))}
      </div>
    </div>
    </div>
  );
};

export default TrainsNearby;
