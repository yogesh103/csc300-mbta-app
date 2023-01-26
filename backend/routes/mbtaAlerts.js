const express = require("express");
const router = express.Router();
const { getAlerts } = require('../services/mbta.service')

router.get('/alerts', async (req, res) => {
    console.log(req);
    console.log('did this get hit');
    const alerts = await getAlerts();
    return res.json(alerts)
  });

  module.exports = router;