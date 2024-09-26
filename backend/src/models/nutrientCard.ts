import mongoose, { Types } from "mongoose";

// Schema for nutrient card which holds information what User has eaten during that day
const nutrientCardSchema = new mongoose.Schema({
    user: [{
        type: Types.ObjectId,
        ref: 'users',
        required: true,
    }],
    dailyCalories: {
        type: Number,
        required: true,
        default: 0
    },
    dailyProteins: {
        type: Number,
        required: true,
        default: 0
    },
    dailyCarbohydrates: {
        type: Number,
        required: true,
        default: 0
    },
    dailyFats: {
        type: Number,
        required: true,
        default: 0
    },
    foodsList: [{
        type: [Types.ObjectId],
        ref: 'foods',
        required: true
    }]
}, { timestamps: true });

export const NutrientCard = mongoose.model('nutrientCards', nutrientCardSchema)