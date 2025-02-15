import mongoose from "mongoose";


const ConnectDb = async () => {
    const mongoUri = process.env.NEXT_PUBLIC_MONGODB_CONNECTION_URL || "";

    if (!mongoUri) {
       console.log("MONGODB_CONNECTION_URL is not defined in environment variables");
    }

    try {
        await mongoose.connect(mongoUri); 
        console.log("MongoDB connected successfully!");
    } catch (error:unknown) {
        console.error("MongoDB connection failed:",error);
        process.exit(1); 
    }
};

export default ConnectDb;
