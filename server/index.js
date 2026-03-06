const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("🚀 MongoDB Connected Successfully"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

app.use('/api/auth', require('./routes/authRoutes'));

// Only listen to a port if running locally, not on Vercel
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// CRITICAL: Vercel needs this export
module.exports = app;