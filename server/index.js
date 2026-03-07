const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables locally
if (process.env.NODE_ENV !== "production") {
    dotenv.config();
}

const app = express();

// ==============================
// CORS CONFIGURATION
// ==============================
const allowedOrigins = [
    "http://localhost:5173",
    process.env.FRONTEND_URL
];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("CORS not allowed"));
            }
        },
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        credentials: true
    })
);

// Handle preflight requests
app.options("*", cors());

// ==============================
// MIDDLEWARE
// ==============================
app.use(express.json());

// ==============================
// DATABASE CONNECTION
// ==============================
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
    console.error("❌ ERROR: MONGO_URI is missing from environment variables");
} else {
    mongoose
        .connect(mongoURI)
        .then(() => console.log("🚀 MongoDB Connected Successfully"))
        .catch((err) => console.error("❌ MongoDB Connection Error:", err));
}

// ==============================
// ROUTES
// ==============================
app.use("/api/auth", require("./routes/authRoutes"));

app.get("/", (req, res) => {
    res.send("AccessLearn Backend is Live and Running!");
});

// ==============================
// LOCAL SERVER ONLY
// ==============================
if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

// ==============================
// EXPORT FOR VERCEL
// ==============================
module.exports = app;