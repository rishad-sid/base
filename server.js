const express = require('express');
const connectDB = require('./config/database');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Body parsing middleware
app.use(express.json());

// Register auth routes
app.use('/api/auth', authRoutes);

// Start the server
const port = process.env.PORT || 7000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
