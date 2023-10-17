const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const bcrypt = require("bcrypt");

const registerUser = async (userData) => {
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        userData.password = hashedPassword;

        const user = new User(userData);
        await user.save();
        return user;
    } catch (error) {
        throw error;
    }
};

const loginUser = async (email, password) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Authentication failed');
        }

        // Compare the user's provided password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new Error('Authentication failed');
        }

        const token = jwt.sign({ _id: user._id, role: user.role }, config.secretKey);
        return { user, token };
    } catch (error) {
        throw error;
    }
};


module.exports = {
    registerUser,
    loginUser,
};
