const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("../routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
let isConnected = false;

async function connectDB() {
    if (isConnected) return;

    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;

    console.log("MongoDB connected");
}

app.use(async (req, res, next) => {
    await connectDB();
    next();
});

// Routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Backend running 🚀");
});

module.exports = app;