const RedisService = require('./redisService');
const { Client } = require('@googlemaps/google-maps-services-js');
const client = new Client({});

class DistanceMatrixService {
  static async getDrivingTime(origin, destination) {
    try {
      const redis = new RedisService();
      const cacheKey = `driving_time_${origin}_${destination}`;
      
      // Check if the result is already cached
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

    //   // Cache the result for 2 hours
      const result = response.data.rows[0].elements[0].duration.text;
      await redis.set(cacheKey, JSON.stringify(result));
      
      console.log("Returning new result for driving time");
      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static async getWalkingTime(origin, destination) {
    try {
      const redis = new RedisService();
      const cacheKey = `walking_time_${origin}_${destination}`;
      
    //   // Check if the result is already cached
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

      // Cache the result for 2 hours
      const result = response.data.rows[0].elements[0].duration.text;
      await redis.set(cacheKey, JSON.stringify(result));
      
      console.log("Returning new result for walking time");
      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

module.exports = DistanceMatrixService;
