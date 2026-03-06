const User = require('../models/User');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');


// =============================
// SIGNUP
// =============================
exports.signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const verificationToken = crypto.randomBytes(20).toString('hex');

        user = new User({
            name,
            email,
            password: hashedPassword,
            role,
            verificationToken
        });

        await user.save();

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const verifyUrl = `${process.env.BASE_URL}/api/auth/verify/${verificationToken}`;

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Verify your AccessLearn Account",
            html: `
                <h3>Welcome to AccessLearn</h3>
                <p>Please verify your email:</p>
                <a href="${verifyUrl}">${verifyUrl}</a>
            `
        });

        res.status(201).json({
            msg: "Registration successful. Please verify your email."
        });

    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};



// =============================
// LOGIN
// =============================
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        if (!user.isVerified) {
            return res.status(401).json({ msg: "Please verify your email first" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });

        res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};



// =============================
// VERIFY EMAIL
// =============================
exports.verifyEmail = async (req, res) => {
    try {
        const user = await User.findOne({
            verificationToken: req.params.token
        });

        if (!user) {
            return res.status(400).send("<h1>Invalid or Expired Link</h1>");
        }

        user.isVerified = true;
        user.verificationToken = undefined;

        await user.save();

        const frontendUrl =
            process.env.FRONTEND_URL || "http://localhost:5173";

        res.send(`
            <html>
                <body style="text-align:center;padding-top:50px;font-family:sans-serif;">
                    <h1>Email Verified Successfully!</h1>
                    <p>Redirecting to login...</p>
                    <script>
                        setTimeout(()=>{
                            window.location.href="${frontendUrl}/auth?verified=true";
                        },3000);
                    </script>
                </body>
            </html>
        `);

    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};