import mongoose, { Types } from "mongoose";

// Schema for nutrient card which holds information what User has eaten during that day
const nutrientCardSchema = new mongoose.Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "users",
      required: true,
    },
    dailyCalories: {
      type: Number,
      required: true,
      default: 0,
    },
    dailyProteins: {
      type: Number,
      required: true,
      default: 0,
    },
    dailyCarbohydrates: {
      type: Number,
      required: true,
      default: 0,
    },
    dailyFats: {
      type: Number,
      required: true,
      default: 0,
    },
    dailyWater: {
      type: Number,
      required: true,
      default: 0
    },
    dailySteps: {
      type: Number,
      required: true,
      default: 0
    },
    mealsList: [
      {
        type: [Types.ObjectId],
        ref: "meals",
        required: true,
      },
    ],
    addedDate: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const NutrientCard = mongoose.model("nutrientcards", nutrientCardSchema);
