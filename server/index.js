const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Only load dotenv if we are NOT on Vercel
if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("🚀 MongoDB Connected Successfully"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));

// Root route to test if the 404 is gone
app.get("/", (req, res) => {
    res.send("AccessLearn Backend is Live and Running!");
});

// Port listener for local development only
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// CRITICAL: Export for Vercel
module.exports = app;