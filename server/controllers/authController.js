import { redis } from "../config/redis.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();
const generateTokens = (userId) => {
    const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m",
    });

    const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "7d",
    });

    return { accessToken, refreshToken };
};

const storeRefreshToken = async (userId, refreshToken) => {
    await redis.set(`refresh_token:${userId}`, refreshToken, "EX", 7 * 24 * 60 * 60); // expiries in 7 days
};

const setCookie = (res, accessToken, refreshToken) => {
    res.cookie("accessToken", accessToken, {
        httpOnly: true, // prevent XSS attacks - cross-site scripting attacks
        sameSite: "strict", // prevent CSRF attacks - cross-site request forgery
        secure: process.env.NODE_ENV === "production", // production
        maxAge: 15 * 60 * 1000, // 15 minutes in milliseconds format
    });
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production", // production
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds format
    });
};

export const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const user = await User.create({ name, email, password });

        // authenticate user
        const { accessToken, refreshToken } = generateTokens(user._id);
        await storeRefreshToken(user._id, refreshToken);

        setCookie(res, accessToken, refreshToken);

        res.status(201).json({
            data: {
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,

                }
            }, message: "User created successfully"
        });
    } catch (error) {
        console.error("Server Error Signup user: ", error.message);
        res.status(500).json({ success: false, message: "Server Error Signup user: ", error });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User does not exist" });
        }

        if (user && (await user.comparePassword(password))) {
            const { accessToken, refreshToken } = generateTokens(user._id);
            await storeRefreshToken(user._id, refreshToken);

            setCookie(res, accessToken, refreshToken);

            res.status(200).json({
                data: {
                    user: {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                    }
                }, message: "User logged in successfully"
            });
        } else {
            res.status(400).json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.error("Server Error Login user: ", error.message);
        res.status(500).json({ success: false, message: "Server Error Login user: ", error });
    }
};

export const logout = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (refreshToken) {
            const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            await redis.del(`refresh_token:${decoded.userId}`);
        }

        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        res.status(200).json({ success: true, message: "User logged out successfully" });
    } catch (error) {
        console.error("Server Error Logout user: ", error.message);
        res.status(500).json({ success: false, message: "Server Error Logout user: ", error });
    }
};

// constant refresh of access token
export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({ success: false, message: "Unauthorized: No refresh token provided" });
        }

        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET); // verify refresh token and get user id
        const storedToken = await redis.get(`refresh_token:${decoded.userId}`);

        if (refreshToken !== storedToken) {
            return res.status(401).json({ success: false, message: "Unauthorized: Invalid refresh token" });
        }

        const accessToken = jwt.sign({ userId: decoded.userId }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "15m",
        });

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production", // production
            maxAge: 15 * 60 * 1000, // 15 minutes in milliseconds format
        });

        res.status(200).json({ success: true, message: "Token refreshed successfully" });
    } catch (error) {
        console.error("Server Error Refresh token: ", error.message);
        res.status(500).json({ success: false, message: "Server Error Refresh token: ", error });
    }
};

// wokr on protected route for this 
export const getProfile = async (req, res) => {
    try {
        // const user = await User.findById(req.user._id);
        res.status(200).json({ success: true, data: req.user });
    } catch (error) {
        console.error("Server Error Get profile: ", error.message);
        res.status(500).json({ success: false, message: "Server Error Get profile: ", error });
    }
};