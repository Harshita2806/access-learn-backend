const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// ONLY load dotenv if we are NOT on Vercel (Production)
if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

const app = express();
app.use(cors());
app.use(express.json());

// Vercel automatically injects process.env variables from the dashboard
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
    console.error("❌ ERROR: MONGO_URI is missing from Vercel Environment Variables!");
} else {
    mongoose.connect(mongoURI)
        .then(() => console.log("🚀 MongoDB Connected Successfully"))
        .catch(err => console.error("❌ MongoDB Connection Error:", err));
}

// Routes
app.use('/api/auth', require('./routes/authRoutes'));

app.get("/", (req, res) => {
    res.send("AccessLearn Backend is Live and Running!");
});

// IMPORTANT: Vercel manages the port. Only listen locally.
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;