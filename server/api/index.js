const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("../routes/authRoutes");

const app = express();

// ===== CORS =====
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// ===== DB =====
let isConnected = false;

async function connectDB() {
    if (isConnected) return;

    await mongoose.connect(process.env.MONGO_URI);

    isConnected = true;
    console.log("MongoDB Connected");
}

app.use(async (req, res, next) => {
    await connectDB();
    next();
});

// ===== ROUTES =====
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.json({ message: "Backend working 🚀" });
});

module.exports = app;