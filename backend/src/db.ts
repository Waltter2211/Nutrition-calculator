import mongoose from "mongoose";
import "dotenv/config";

// Function for connection to db
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL!);
    console.log("Connected to DB")
  } catch (error) {
    console.log(error);
  }
};
