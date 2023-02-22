const express = require("express");
const router = express.Router();
const { getRoute, getSchedule } = require('../services/mbta.service')

router.get('/schedule/:routeId', async (req, res) => {
    const routeId = req.params.routeId;
    const alerts = await getSchedule(routeId);
    return res.json(alerts)
});

module.exports = router;