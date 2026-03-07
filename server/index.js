const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

if (process.env.NODE_ENV !== "production") {
    dotenv.config();
}

const app = express();

// ==================
// CORS
// ==================
const allowedOrigins = [
    "http://localhost:5173",
    process.env.FRONTEND_URL
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));

// ==================
// MIDDLEWARE
// ==================
app.use(express.json());

// ==================
// DATABASE
// ==================
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
    console.error("❌ MONGO_URI missing");
} else {
    mongoose.connect(mongoURI)
        .then(() => console.log("✅ MongoDB Connected"))
        .catch(err => console.error("MongoDB error:", err));
}

// ==================
// ROUTES
// ==================
app.use("/api/auth", require("./routes/authRoutes"));

app.get("/", (req, res) => {
    res.send("AccessLearn Backend is Live and Running!");
});

// ==================
// LOCAL SERVER
// ==================
if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

// ==================
// EXPORT
// ==================
module.exports = app;