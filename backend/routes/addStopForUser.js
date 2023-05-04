const express = require("express");
const router = express.Router();
const Stop = require('../models/stopModel')
const User = require('../models/userModel')

/**
 * @swagger
 * /user/{user_id}/favStops/{stop_id}:
 *   post:
 *     summary: Add a stop to a user's favorite stops
 *     tags: [Favorite Stops]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *       - in: path
 *         name: stop_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The stop ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               longitude:
 *                 type: number
 *               latitude:
 *                 type: number
 *               stop_name:
 *                 type: string
 *               direction_name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Stop added to favorite stops
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.post('/:user_id/favStops/:stop_id', async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const newStop = new Stop({
      stop_id: req.params.stop_id,
      user_id: req.params.user_id,
      longitude: req.body.longitude || '',
      latitude: req.body.latitude || '',
      name: req.body.stop_name || '',
      direction_name: req.body.direction_name || '',
    });

    const stop = await Stop.findOne({ stop_id: newStop.stop_id, user_id: newStop.user_id , direction_name: newStop.direction_name});
    if(!stop) {
      await newStop.save();
    }
    res.status(201).json({ message: 'Stop added to favorite stops', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /user/{user_id}/favStops:
 *   get:
 *     summary: List a user's favorite stops
 *     tags: [Favorite Stops]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: A list of favorite stops
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Stop'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get('/:user_id/favStops', async (req, res) => {
  try {
    const stops = await Stop.find({user_id: req.params.user_id})
    if (!stops) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(stops);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /user/{user_id}/favStops/{stop_id}:
 *   delete:
 *     summary: Remove a stop from a user's favorite stops
 *     tags: [Favorite Stops]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *       - in: path
 *         name: stop_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The stop ID
 *       - in: query
 *         name: direction_name
 *         schema:
 *           type: string
 *         required: true
 *         description: The direction name
 *     responses:
 *       200:
 *         description: Stop removed from favorite stops
 *       404:
 *         description: User or stop not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:user_id/favStops/:stop_id', async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const deletedStop = await Stop.findOneAndDelete({
      user_id: req.params.user_id,
      stop_id: req.params.stop_id,
      direction_name: req.query.direction_name 
    });

    if (!deletedStop) {
      return res.status(404).json({ message: 'Stop not found' });
    }
    res.status(200).json({ message: 'Stop removed from favorite stops', user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;