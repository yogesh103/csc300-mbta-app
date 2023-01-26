const express = require("express");
const router = express.Router();
const { getAlerts } = require('../services/mbta.service')

router.get('/alerts', async (req, res) => {
    const alerts = await getAlerts();
    return res.json(alerts)
  });

  module.exports = router;