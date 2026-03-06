const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// 1. Only use dotenv if NOT on Vercel
if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

const app = express();
app.use(cors());
app.use(express.json());

// 2. CRITICAL: Check if MONGO_URI exists before connecting
const dbURI = process.env.MONGO_URI;

if (!dbURI) {
    console.error("❌ ERROR: MONGO_URI is not defined in Environment Variables!");
} else {
    mongoose.connect(dbURI)
        .then(() => console.log("🚀 MongoDB Connected Successfully"))
        .catch(err => console.error("❌ MongoDB Connection Error:", err));
}

app.use('/api/auth', require('./routes/authRoutes'));

app.get("/", (req, res) => {
    res.send("AccessLearn Backend is Live and Running!");
});

if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;