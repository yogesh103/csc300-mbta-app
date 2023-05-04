const express = require('express');
const axios = require('axios');
const {getDrivingTime , getWalkingTime} = require('../services/distanceMatrix');

const router = express.Router();
/**
 * @swagger
 * /train/nearby:
 *   get:
 *     summary: Retrieve nearby stations with predictions
 *     description: Get a list of nearby stations with their predictions, routes, driving, and walking times.
 *     tags:
 *       - Nearby Stations
 *     parameters:
 *       - in: query
 *         name: latitude
 *         schema:
 *           type: number
 *         required: true
 *         description: Latitude of the user's location
 *       - in: query
 *         name: longitude
 *         schema:
 *           type: number
 *         required: true
 *         description: Longitude of the user's location
 *     responses:
 *       200:
 *         description: A JSON array of nearby stations with predictions and times
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The station ID
 *       500:
 *         description: An error occurred
 */
router.get('/nearby', async (req, res) => {
  const { latitude, longitude } = req.query;
  const API_KEY = process.env.MBTA_API_KEY;

  try {
    const response = await axios.get(
      `https://api-v3.mbta.com/stops?api_key=${API_KEY}&filter[latitude]=${latitude}&filter[longitude]=${longitude}&filter[radius]=0.08&filter[route_type]=0,2`
    );
    const stations = response.data.data;

    // Make a separate request for the predictions for each station
    const predictionRequests = stations.map((station) =>
      axios.get(`https://api-v3.mbta.com/predictions?api_key=${API_KEY}&filter[stop]=${station.id}`)
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
      axios.get(`https://api-v3.mbta.com/routes/${routeId}?api_key=${API_KEY}`)
    );
    const routeResponses = await Promise.all(routeRequests);
    const routesById = routeResponses.reduce((accumulator, response) => {
      const route = response.data.data;
      accumulator[route.id] = route;
      return accumulator;
    }, {});

    // Combine the station, prediction, and route data
    const stationsWithPredictionsAndRoutes = stations.map((station) => {
      const predictions = predictionsByStationId[station.id] || [];
      const predictionsWithRoutes = predictions.map((prediction) => ({
        ...prediction,
        timeInMinutes: Math.floor(
          (new Date(prediction.attributes.arrival_time ?? prediction.attributes.departure_time) - Date.now()) / (1000 * 60)
        ),
        route: routesById[prediction.relationships.route.data.id],
      }));
      return {
        ...station,
        predictions: predictionsWithRoutes,
      };
    });

    // Add driving and walking times to each station
    const stationsWithTimes = stationsWithPredictionsAndRoutes.map(async (station) => {
        return ({
            ...station,
            drivingTimeInMinutes: await getDrivingTime([{ lat: station.attributes.latitude, lng: station.attributes.longitude }], [{ lat: latitude, lng: longitude }]),
            walkingTimeInMinutes: await getWalkingTime([{ lat: station.attributes.latitude, lng: station.attributes.longitude }], [{ lat: latitude, lng: longitude }]),
        });
    });

    const stationsWithTimesResolved = await Promise.all(stationsWithTimes);
    res.send(stationsWithTimesResolved);
    
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;