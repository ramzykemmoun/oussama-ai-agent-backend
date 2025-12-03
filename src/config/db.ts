import mongoose from "mongoose";

export const connectDB = () => {
    mongoose.connect(process.env.DATABASE_URL!)
        .then(() => console.log(" Connected to MongoDB"))
        .catch((err) => console.error(" MongoDB connection error:", err));
}