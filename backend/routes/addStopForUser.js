const express = require("express");
const router = express.Router();
const Stop = require('../models/userModel')

router.post('/:userId/stops', async (req, res) => {
    const userId = req.params.userId;
    const { name, location, longitude, latitude, stop_id } = req.body;
  
    try {
      const newStop = new Stop({
        name,
        location,
        longitude,
        latitude,
        stop_id,
      });
  
      // Save the stop to the database
      await newStop.save();
  
      // Add the stop to the user's collection of stops
      await User.findByIdAndUpdate(userId, { $push: { stops: newStop._id } });
  
      res.status(201).json(newStop);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  module.exports = router;