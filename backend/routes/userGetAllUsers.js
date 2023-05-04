const express = require("express");
const router = express.Router();
const newUserModel = require('../models/userModel')
/**
 * @swagger
 * /user/getAll:
 *   get:
 *     summary: Retrieve all users
 *     description: Retrieve a list of all users.
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: A list of all users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: An error occurred
 */
router.get('/getAll', async (req, res) => {
    const user = await newUserModel.find();
    return res.json(user)
  })

  module.exports = router;