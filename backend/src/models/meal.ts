import mongoose, { Types } from "mongoose";

// Schema for a single food
const mealSchema = new mongoose.Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "users",
      required: true,
    },
    foodEaten: {
      type: Types.ObjectId,
      ref: "foods",
      required: true,
    },
    caloriesCount: {
      type: Number,
      required: true,
    },
    proteinsCount: {
      type: Number,
      required: true,
    },
    carbohydratesCount: {
      type: Number,
      required: true,
    },
    fatsCount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Meal = mongoose.model("meals", mealSchema);
