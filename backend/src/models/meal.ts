import mongoose, { Types } from "mongoose";

// Schema for a single meal
const mealSchema = new mongoose.Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "users",
      required: true,
    },
    nutrientCard: {
      type: Types.ObjectId,
      ref: "nutrientCards",
      requred: true
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
