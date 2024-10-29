import mongoose from "mongoose";
import "dotenv/config";

// Function for connection to db
export const connectDB = async () => {
  try {
    if (process.env.NODE_ENV === "development ") {
      await mongoose.connect(process.env.MONGODB_URI_DEV!);
      console.log("Connected to dev DB");
    } else if (process.env.NODE_ENV === "production ") {
      await mongoose.connect(process.env.MONGODB_URI_PROD!);
      console.log("Connected to prod DB");
    } else {
      throw new Error("Could not connect to DB.");
    }
  } catch (error) {
    console.log(error);
  }
};
