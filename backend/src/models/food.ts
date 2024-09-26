import mongoose, { Types } from "mongoose";

// Schema for a single food
const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    calories: {
        type: Number,
        required: true,
        default: 0
    },
    proteins: {
        type: Number,
        required: true,
        default: 0
    },
    carbohydrates: {
        type: Number,
        required: true,
        default: 0
    },
    fats: {
        type: Number,
        required: true,
        default: 0
    }
}, { timestamps: true });

export const Food = mongoose.model('foods', foodSchema)