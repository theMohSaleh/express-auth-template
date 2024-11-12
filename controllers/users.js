// /controllers/users.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

router.post('/signup', async (req, res) => {
    try {
        // Check if the username is already taken
        const userInDatabase = await User.findOne({ username: req.body.username });
        if (userInDatabase) {
            throw new Error('Username already taken.');
        }
        // Create a new user with hashed password
        const user = await User.create({
            username: req.body.username,
            hashedPassword: bcrypt.hashSync(req.body.password, parseInt(process.env.SALT_LENGTH)),
        })
        res.status(201).json({ user });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Something went wrong!' });
    }
});

module.exports = router;