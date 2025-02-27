import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import serverUser from "../models/server.user";

dotenv.config();
const router = express.Router();

router.post('/', async (req, res) => {
    const { emailOrUsername, password } = req.body;

    try {
        const user = await serverUser.findOne({
            $or: [{ email: emailOrUsername }, { username: emailOrUsername }]
        });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid username/email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid username/email or password" });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({
            success: true,
            token,
            user: {
                id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

export default router;