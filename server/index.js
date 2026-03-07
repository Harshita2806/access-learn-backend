const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

if (process.env.NODE_ENV !== "production") {
    dotenv.config();
}

const app = express();

// ===== CORS (OPEN FOR DEBUGGING) =====
app.use(cors());
app.options("/*", cors());

// ===== MIDDLEWARE =====
app.use(express.json());

// ===== DATABASE =====
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
    console.error("❌ MONGO_URI missing");
} else {
    mongoose.connect(mongoURI)
        .then(() => console.log("🚀 MongoDB Connected Successfully"))
        .catch(err => console.error("MongoDB error:", err));
}

// ===== ROUTES =====
app.use("/api/auth", require("./routes/authRoutes"));

app.get("/", (req, res) => {
    res.send("AccessLearn Backend is Live and Running!");
});

// ===== LOCAL SERVER =====
if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// ===== EXPORT FOR VERCEL =====
module.exports = app;