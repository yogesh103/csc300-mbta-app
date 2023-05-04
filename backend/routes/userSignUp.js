const express = require("express");
const router = express.Router();
const z = require('zod')
const bcrypt = require("bcryptjs");
const { newUserValidation } = require('../models/userValidator')
const newUserModel = require('../models/userModel')

/**
 * @swagger
 * /user/signup:
 *   post:
 *     summary: Sign up a new user
 *     description: Create a new user account with a unique username, email, and password.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username
 *               email:
 *                 type: string
 *                 description: The email address
 *               password:
 *                 type: string
 *                 description: The password
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid input data or error creating user
 *       409:
 *         description: Username is already taken
 */

router.post('/signup', async (req, res) => {
    const { error } = newUserValidation(req.body);
    console.log(error)
    if (error) return res.status(400).send({ message: error.errors[0].message });

    const { username, email, password } = req.body

    //check if email already exists
    const user = await newUserModel.findOne({ username: username })
    if (user)
        return res.status(409).send({ message: "Username is taken, pick another" })

    //generates the hash
    const generateHash = await bcrypt.genSalt(Number(10))

    //parse the generated hash into the password
    const hashPassword = await bcrypt.hash(password, generateHash)

    //creates a new user
    const createUser = new newUserModel({
        username: username,
        email: email,
        password: hashPassword,
    });

   
    try {
        const saveNewUser = await createUser.save();
        res.send(saveNewUser);
    } catch (error) {
        res.status(400).send({ message: "Error trying to create new user" });
    }

})

module.exports = router;