const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect using the variable you saved in Vercel Settings
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("🚀 MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB Error:", err));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));

// This test route helps us confirm the 404 is gone
app.get("/", (req, res) => {
    res.send("AccessLearn Backend is Live!");
});

// IMPORTANT: No app.listen() here. Vercel handles the port.
module.exports = app;