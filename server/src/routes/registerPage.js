import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import serverUser from '../models/server.user.js';

dotenv.config();
const router = express.Router();

router.post('/', async (req, res) => {
    const { firstname, lastname, username, email, password } = req.body;

    try {
        let user = await serverUser.findOne({ $or: [{ email }, { username }] });
        if (user) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({ firstname, lastname, username, email, password: hashedPassword });
        await user.save();

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
                email: user.email,
                username: user.username
            }
        });

    } catch (error) {
        res.status(500).json({ success: false, message: `Server error: ${error.message}` });
    }
});

export default router;