import mongoose, { Types } from "mongoose";

// Schema for User
const userSchema = new mongoose.Schema(
  {
    username: {
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
    goalCalories: {
      type: Number,
      required: true,
      default: 2300
    },
    goalProteins: {
      type: Number,
      required: true,
      default: 150
    },
    goalCarbohydrates: {
      type: Number,
      required: true,
      default: 240
    },
    goalFats: {
      type: Number,
      required: true,
      default: 90
    },
    goalWater: {
      type: Number,
      required: true,
      default: 0
    },
    goalSteps: {
      type: Number,
      required: true,
      default: 0
    }
  },
  { timestamps: true }
);

export const User = mongoose.model("users", userSchema);
