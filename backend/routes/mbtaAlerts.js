const express = require("express");
const router = express.Router();
const { getAlerts } = require('../services/mbta.service')
/**
 * @swagger
 * /mbta/alerts:
 *   get:
 *     summary: Retrieve a list of alerts
 *     description: Get a list of alerts from the MBTA service.
 *     tags:
 *       - Alerts
 *     responses:
 *       200:
 *         description: A JSON array of alerts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The alert ID
 *                   type:
 *                     type: string
 *                     description: The resource type (should be "alert")
 *                   attributes:
 *                     type: object
 *                     properties:
 *                       header:
 *                         type: string
 *                         description: The alert header
 *                       description:
 *                         type: string
 *                         description: The alert description
 *                   relationships:
 *                     type: object
 *                   links:
 *                     type: object
 */
router.get('/alerts', async (req, res) => {
    const alerts = await getAlerts();
    return res.json(alerts)
  });

  module.exports = router;