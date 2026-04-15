import mongoose, { Schema, Document } from "mongoose";

export interface IRecipe extends Document {
    title: string;
    description: string;
    ingredients: string[];
    category: string;
    cookingTime: number;
    difficulty: string;
    imageUrl: string;
}

const recipeSchema: Schema = new Schema(
    {
        title: {
            type: String,
            required: true,
            minlength: 3,
        },

        description: {
            type: String,
            required: true,
            minlength: 10,
        },

        ingredients: {
            type: [String],
            required: true,
        },

        category: {
            type: String,
            required: true,
            enum: ["Breakfast", "Lunch", "Dinner", "Dessert"],
        },

        cookingTime: {
            type: Number,
            required: true,
            min: 1,
        },

        difficulty: {
            type: String,
            required: true,
            enum: ["Easy", "Medium", "Hard"],
        },
    },
    { timestamps: true }
);

export default mongoose.model<IRecipe>("Recipe", recipeSchema);