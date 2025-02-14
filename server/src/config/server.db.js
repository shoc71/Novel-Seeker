import mongoose from "mongoose";
import dotenv from 'dotenv';

// middleware
dotenv.config();

// making connection for mongoose to connect mongoDB
export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.error("Error: ", error)
        process.exit(1) // process code; 0 - success, 1 - failure
    }
}