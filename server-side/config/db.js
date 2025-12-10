import mongoose from "mongoose";
export const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            console.error("MONGO_URI environment variable is not set");
            throw new Error("MONGO_URI is required");
        }
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected successfully ${conn.connection.host}`);
        return conn;
    }
    catch (error) {
        console.error("Database connection error:", error);
        // Don't exit process - let server continue running
        // The server can retry connection later
        throw error;
    }
}