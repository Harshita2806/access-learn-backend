const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Directly use process.env - Vercel handles this
const dbURI = process.env.MONGO_URI;

mongoose.connect(dbURI)
    .then(() => console.log("🚀 MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));

app.get("/", (req, res) => {
    res.send("AccessLearn Backend is Live!");
});

// IMPORTANT: Do NOT use app.listen() for Vercel production
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Local server on ${PORT}`));
}

module.exports = app;