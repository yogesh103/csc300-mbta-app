const express = require("express");
const router = express.Router();
const z = require("zod");
const bcrypt = require("bcryptjs");

const newUserModel = require("../models/userModel");

router.get("/getUserById", async (req, res) => {
  const { userId } = req.body;

  newUserModel.findById(userId, function (err, user) {
    if (err) {
      console.log(err);
    }
    if (user===null) {
      res.status(404).send("userId does not exist.");
    } 
    else {
      return res.json(user);
    }
  });
});

module.exports = router;
