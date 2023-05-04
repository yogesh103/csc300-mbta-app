const express = require("express");
const router = express.Router();
const z = require("zod");
const bcrypt = require("bcryptjs");

const newUserModel = require("../models/userModel");
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The user ID
 *         username:
 *           type: string
 *           description: The username
 *         email:
 *           type: string
 *           description: The email address
 *         password:
 *           type: string
 *           description: The hashed password
 *         favStops:
 *           type: array
 *           items:
 *             type: string
 *           description: The user's favorite stops
 *         date:
 *           type: string
 *           format: date-time
 *           description: The date the user was created
 * /user/getUserById:
 *   get:
 *     summary: Retrieve user by ID
 *     description: Retrieve a user by their user ID.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The user ID
 *     responses:
 *       200:
 *         description: A user object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: An error occurred
 */

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
