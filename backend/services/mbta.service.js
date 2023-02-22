const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const API_KEY = process.env.API_KEY;
const MBTA_API_URL = 'https://api-v3.mbta.com/';

async function getSubwayLines() {
  try {
    const response = await axios.get('https://api-v3.mbta.com/routes?filter[type]=0', {
      headers: {
        'x-api-key': API_KEY
      }
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
}

 async function getAlerts() {
  try {
    const response = await
      axios.get('https://api-v3.mbta.com/alerts', {
        headers: {
          'x-api-key': API_KEY
        }
      });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
}

async function getRoute(routeId) {
  const endpoint = `/routes/${routeId}`;
  const { data } = await axios.get(MBTA_API_URL + endpoint, {
    params: {
      api_key: API_KEY
    }
  });
  return data;
}

async function getSchedule(routeId) {
  const endpoint = `/schedules`;
  const { data } = await axios.get(MBTA_API_URL + endpoint, {
    params: {
      api_key: API_KEY,
      filter: {
        route: routeId
      }
    }
  });
  return data;
}

async function getVehicle(vehicleId) {
  const endpoint = `/vehicles/${vehicleId}`;
  const { data } = await axios.get(MBTA_API_URL + endpoint, {
    params: {
      api_key: API_KEY
    }
  });
  return data;
}

async function getPrediction(vehicleId) {
    const endpoint = `/predictions`;
    const { data } = await axios.get(MBTA_API_URL + endpoint, {
      params: {
        api_key: API_KEY,
        filter: {
          vehicle: vehicleId
        }
      }
    });
    return data;
  }

  async function generateScheduleWithVehicleTracker(routeId) {
    const route = await getRoute(routeId);
    const schedule = await getSchedule(routeId);
    const vehicles = schedule.data.map(async vehicle => {
      const vehicleInfo = await getVehicle(vehicle.attributes.vehicle_id);
      const prediction = await getPrediction(vehicle.attributes.vehicle_id);
      return {
        ...vehicleInfo.data.attributes,
        prediction: prediction.data[0].attributes.arrival_time
      };
    });
    const vehicleInfo = await Promise.all(vehicles);
    return {
      route: route.data.attributes,
      schedule: schedule.data,
      vehicleInfo
    };
  }

module.exports.generateScheduleWithVehicleTracker = generateScheduleWithVehicleTracker;
module.exports.getSchedule = getSchedule;
module.exports.getRoute = getRoute;
module.exports.getVehicle = getVehicle;  
module.exports.getAlerts = getAlerts;
module.exports.getSubwayLines = getSubwayLines;

