import mongoose from "mongoose";


const ConnectDb = async () => {
    const mongoUri = process.env.MONGODB_CONNECTION_URL;

    if (!mongoUri) {
        throw new Error("MONGODB_CONNECTION_URL is not defined in environment variables");
    }

    try {
        await mongoose.connect(mongoUri); 
        console.log("MongoDB connected successfully!");
    } catch (error) {
        console.error("MongoDB connection failed:");
        process.exit(1); 
    }
};

export default ConnectDb;
