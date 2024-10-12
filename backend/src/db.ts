import mongoose from "mongoose";

// Function for connection to db
export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/nutrition-calculator");
    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
  }
};
