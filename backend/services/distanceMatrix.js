const { Client } = require('@googlemaps/google-maps-services-js');
const client = new Client({});
const Redis = require("ioredis");

// Create a Redis instance.
// By default, it will connect to localhost:6379.
// We are going to cover how to specify connection options soon.
const redis = new Redis({
  port: 6379, // Redis port
  host: process.env.REDIS_HOST, //
});

class DistanceMatrixService {
  static async getDrivingTime(origin, destination) {
    try {
      const [originLatLng] = origin;
      const [destinationLatLng] = destination;
    
      const { lat: originLat, lng: originLng } = originLatLng;
      const { lat: destinationLat, lng: destinationLng } = destinationLatLng;

      const cacheKey = `driving_time_${[originLat]}_${[originLng]}_${[destinationLat]}_${[destinationLng]}`;
      
      // Check if the result is already cached
      console.log(cacheKey)
      const cachedResult = await redis.get(cacheKey);
      if (cachedResult) {
        console.log('Returning cached result for driving time');
        return JSON.parse(cachedResult);
      }

      // If not cached, get the result from Google Maps API
      const response = await client.distancematrix({
        params: {
          origins: origin,
          destinations: destination,
          mode: 'driving',
          key: process.env.GOOGLE_MAPS_API_KEY,
        },
      });

      const result = response.data.rows[0].elements[0].duration.text;
      await redis.set(cacheKey, JSON.stringify(result), "EX", 7200);
      console.log("Returning new result for driving time");
      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static async getWalkingTime(origin, destination) {
    try {
      const [originLatLng] = origin;
      const [destinationLatLng] = destination;
    
      const { lat: originLat, lng: originLng } = originLatLng;
      const { lat: destinationLat, lng: destinationLng } = destinationLatLng;

      const cacheKey = `walking_time_${[originLat]}_${[originLng]}_${[destinationLat]}_${[destinationLng]}`;

      // Check if the result is already cached
      const cachedResult = await redis.get(cacheKey);
      if (cachedResult) {
        console.log('Returning cached result for walking time');
        return JSON.parse(cachedResult);
      }

      // If not cached, get the result from Google Maps API
      const response = await client.distancematrix({
        params: {
          origins: origin,
          destinations: destination,
          mode: 'walking',
          key: process.env.GOOGLE_MAPS_API_KEY,
        },
      });

    
      const result = response.data.rows[0].elements[0].duration.text;
      await redis.set(cacheKey, JSON.stringify(result), "EX", 7200);
      
      console.log("Returning new result for walking time");
      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

module.exports = DistanceMatrixService;
