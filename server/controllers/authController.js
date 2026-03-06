const User = require('../models/User');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

// SIGNUP 
exports.signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: "User already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const token = crypto.randomBytes(20).toString('hex');

        user = new User({
            name, email, password: hashedPassword, role, verificationToken: token
        });
        await user.save();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
        });

        const url = `${process.env.BASE_URL}/api/auth/verify/${token}`;

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Verify your Test Account',
            html: `<h3>Welcome to AccessLearn Sandbox!</h3>
                   <p>Click below to verify:</p>
                   <a href="${url}">${url}</a>`
        });

        res.status(201).json({ msg: "Test Registration successful! Check email." });
    } catch (err) {
        res.status(500).send("Server Error");
    }
};

// VERIFY EMAIL (Teal Theme Landing Page)
exports.verifyEmail = async (req, res) => {
    try {
        const user = await User.findOne({ verificationToken: req.params.token });
        if (!user) return res.status(400).send("<h1>Link Expired</h1>");

        user.isVerified = true;
        user.verificationToken = undefined;
        await user.save();

        const frontendUrl = process.env.BASE_URL.replace('5000', '5173');

        res.send(`
            <html>
                <body style="text-align: center; padding-top: 100px; font-family: sans-serif; background-color: #050507; color: white;">
                    <div style="display: inline-block; padding: 40px; border: 1px solid rgba(20, 184, 166, 0.3); border-radius: 2rem; background: #0d0d12;">
                        <h1 style="color: #2dd4bf;">Verification Successful!</h1>
                        <p style="color: #9ca3af;">Testing folder account is now active in AccessLearn DB.</p>
                        <a href="${frontendUrl}" style="display: inline-block; margin-top: 20px; padding: 12px 24px; background: #14b8a6; color: black; text-decoration: none; border-radius: 12px; font-weight: bold;">Go to Login</a>
                    </div>
                </body>
            </html>
        `);
    } catch (err) {
        res.status(500).send("Server Error");
    }
};

// Keep your existing login logic here...