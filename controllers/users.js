// /controllers/users.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
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
        const token = jwt.sign({ username: user.username, _id: user._id },
            process.env.JWT_SECRET
        );
        res.status(201).json({ user, token });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Something went wrong!' });
    }
});

router.post('/signin', async (req, res) => {
    try {
        // Check if the user is found
        const user = await User.findOne({ username: req.body.username });
        if (user && bcrypt.compareSync(req.body.password, user.hashedPassword)) {
            const token = jwt.sign({ username: user.username, _id: user._id },
                process.env.JWT_SECRET
            );
            res.json({ token });
        } else {
            throw new Error('Invalid Credentials');
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ error: 'Invalid Credentials' });
    }
});

module.exports = router;