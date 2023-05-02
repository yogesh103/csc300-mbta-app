const express = require("express");
const router = express.Router();
const Stop = require('../models/stopModel')
const User = require('../models/userModel')

// Add a stop to a user's favorite stops
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
      user.favStops.push(newStop);
      await user.save();
    }

    res.status(201).json({ message: 'Stop added to favorite stops', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// List a user's favorite stops
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

router.delete('/:user_id/favStops/:stop_id', async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const deletedStop = await Stop.findOneAndDelete({
      user_id: req.params.user_id,
      stop_id: req.params.stop_id
    });

    if (!deletedStop) {
      return res.status(404).json({ message: 'Stop not found' });
    }
    user.favStops = user.favStops.filter(stopId => !stopId.equals(req.params.stop_id));
    await user.save();
    res.status(200).json({ message: 'Stop removed from favorite stops', user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;