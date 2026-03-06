const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// MIDDLEWARE - Allows all team members' browsers to talk to this API
app.use(cors());
app.use(express.json());

// DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("🚀 Connected to Cloud Database"))
    .catch(err => console.error("❌ MongoDB Error:", err));

// ROUTES
app.use('/api/auth', require('./routes/authRoutes'));

// Only start the listener if NOT on Vercel (for local development)
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// CRITICAL: Export the app for Vercel
module.exports = app;