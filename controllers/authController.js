const authService = require('../services/authService');
const express = require('express');
const router = express.Router();
const validation = require('../validation/validation'); // Import the validation module

router.post('/register', async (req, res) => {
    try {
        const userData = req.body;

        // Validate user data using the registration schema
        const { error } = validation.registerSchema.validate(userData);
        if (error) {
            return res.status(400).json({ message: 'Validation error', error: error.details });
        }

        const user = await authService.registerUser(userData);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Registration failed', error: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate login data using the login schema
        const { error } = validation.loginSchema.validate({ email, password });
        if (error) {
            return res.status(400).json({ message: 'Validation error', error: error.details });
        }

        const { user, token } = await authService.loginUser(email, password);
        res.status(200).json({ user, token });
    } catch (error) {
        res.status(401).json({ message: 'Authentication failed', error: error.message });
    }
});

module.exports = router;
