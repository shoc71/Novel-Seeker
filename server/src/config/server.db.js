import mongoose from "mongoose";

const test = "mongodb+srv://supersonicwind6:KjERvGqopJgtbAdo@cluster001.becro.mongodb.net/product?retryWrites=true&w=majority&appName=Cluster001"

// making connection for mongoose to connect mongoDB
export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(test)
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.error("Error: ", error)
        process.exit(1) // process code; 0 - success, 1 - failure
    }
}
