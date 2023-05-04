const express = require("express");
const router = express.Router();
const newUserModel = require('../models/userModel')
/**
 * @swagger
 * /user/deleteAll:
 *   post:
 *     summary: Delete all users
 *     description: Delete all users from the database.
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: A JSON object with a message confirming that all users have been deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 n:
 *                   type: number
 *                   description: The number of deleted users
 *                 ok:
 *                   type: number
 *                   description: The status of the delete operation (1 for success)
 *       500:
 *         description: An error occurred
 */
router.post('/deleteAll', async (req, res) => {
    const user = await newUserModel.deleteMany();
    return res.json(user)
  })

  module.exports = router;