const { Client } = require('@googlemaps/google-maps-services-js');

const client = new Client({});

class DistanceMatrixService {
  static async getDrivingTime(origin, destination) {
    try {
      const response = await client.distancematrix({
        params: {
          origins: [origin],
          destinations: [destination],
          mode: 'driving',
          key: process.env.GOOGLE_MAPS_API_KEY,
        },
      });
      return response.data.rows[0].elements[0].duration.text;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static async getWalkingTime(origin, destination) {
    try {
      const response = await client.distancematrix({
        params: {
          origins: [origin],
          destinations: [destination],
          mode: 'walking',
          key: process.env.GOOGLE_MAPS_API_KEY,
        },
      });
      return response.data.rows[0].elements[0].duration.text;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

module.exports = DistanceMatrixService;