// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");
// const crypto = require("crypto");
// const nodemailer = require("nodemailer");

// exports.signup = async (req, res) => {
//     const { username, email, password } = req.body;

//     try {
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ error: "Email already exists" });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newUser = new User({ username, email, password: hashedPassword });

//         await newUser.save();
//         res.status(201).json({ message: "User created successfully" });
//     } catch (err) {
//         res.status(500).json({ error: "Server error" });
//     }
// };


// exports.login = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         const user = await User.findOne({ email });
//         if (!user) return res.status(400).json({ message: "Invalid credentials" });

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

//         const token = jwt.sign({ id: user._id }, "secretKey", { expiresIn: "1h" });
//         res.json({ message: "Login successful", token });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // Forgot Password
// exports.forgotPassword = async (req, res) => {
//     try {
//         const { email } = req.body;
//         const user = await User.findOne({ email });
//         if (!user) return res.status(400).json({ message: "Email not found" });

//         // Generate token valid for 15 minutes
//         const resetToken = crypto.randomBytes(20).toString("hex");

//         // Save token and expiration in DB
//         user.resetPasswordToken = resetToken;
//         user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 mins
//         await user.save();

//         // Configure Nodemailer (Gmail example)
//         const transporter = nodemailer.createTransport({
//             service: "Gmail",
//             auth: {
//                 user: "yourgmail@gmail.com",          // replace with your Gmail
//                 pass: "your_app_password_here"        // use App Password
//             }
//         });

//         // Email content
//         const mailOptions = {
//             from: "yourgmail@gmail.com",
//             to: user.email,
//             subject: "Password Reset Request",
//             html: `
//         <p>You requested a password reset.</p>
//         <p>Click this link to reset your password:</p>
//         <a href="http://localhost:4200/reset-password/${resetToken}">Reset Password</a>
//         <p>This link will expire in 15 minutes.</p>
//       `
//         };

//         // Send the email
//         await transporter.sendMail(mailOptions);

//         res.json({ message: "Password reset link sent to your email" });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // Reset Password
// exports.resetPassword = async (req, res) => {
//     try {
//         const { token } = req.params;
//         const { newPassword } = req.body;

//         const user = await User.findOne({
//             resetPasswordToken: token,
//             resetPasswordExpires: { $gt: Date.now() }
//         });

//         if (!user) return res.status(400).json({ message: "Invalid or expired token" });

//         // Hash new password and save
//         const hashedPassword = await bcrypt.hash(newPassword, 10);
//         user.password = hashedPassword;
//         user.resetPasswordToken = undefined;
//         user.resetPasswordExpires = undefined;

//         await user.save();
//         res.json({ message: "Password has been reset successfully" });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const User = require("../models/User");




// Signup
exports.signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Email already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        res.json({ message: "Login successful" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Forgot Password
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Email not found" });

        // Generate token valid for 15 mins
        const resetToken = crypto.randomBytes(20).toString("hex");
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
        await user.save();

        // Mail transporter (Mailtrap example)
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });


        const mailOptions = {
            from: "noreply@example.com",
            to: user.email,
            subject: "Password Reset",
            html: `<p>You requested a password reset.</p>
             <p>Click <a href="http://localhost:4200/reset-password/${resetToken}">here</a> to reset your password. This link expires in 15 minutes.</p>`
        };

        await transporter.sendMail(mailOptions);

        res.json({ message: "Password reset link sent to your email" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Reset Password
exports.resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) return res.status(400).json({ message: "Invalid or expired token" });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        res.json({ message: "Password has been reset successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
