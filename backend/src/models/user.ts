import mongoose, { Types } from "mongoose";

// Schema for User
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    dailyNutrients: [
      {
        type: [Types.ObjectId],
        ref: "nutrientCards",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

export const User = mongoose.model("users", userSchema);
