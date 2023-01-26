const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const API_KEY = process.env.API_KEY;

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


module.exports.getAlerts = getAlerts;
module.exports.getSubwayLines = getSubwayLines;

