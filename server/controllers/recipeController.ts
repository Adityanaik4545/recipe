import { Request, Response } from "express";
import Recipe from "../models/recipe";

// CREATE RECIPE
export const createRecipe = async (req: Request, res: Response) => {
    try {
        const recipe = new Recipe(req.body);
        const savedRecipe = await recipe.save();

        res.status(201).json(savedRecipe);
    } catch (error: any) {
        res.status(400).json({
            message: error.message || "Validation failed",
        });
    }
};

// GET ALL RECIPES
export const getRecipes = async (req: Request, res: Response) => {
    try {
        const recipes = await Recipe.find().sort({ createdAt: -1 });
        res.status(200).json(recipes);
    } catch (error: any) {
        res.status(500).json({
            message: error.message || "Error fetching recipes",
        });
    }
};

// GET SINGLE RECIPE
export const getRecipeById = async (req: Request, res: Response) => {
    try {
        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        res.status(200).json(recipe);
    } catch (error: any) {
        res.status(500).json({
            message: error.message || "Error fetching recipe",
        });
    }
};

// UPDATE RECIPE
export const updateRecipe = async (req: Request, res: Response) => {
    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true, // 🔥 important
            }
        );

        if (!updatedRecipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        res.status(200).json(updatedRecipe);
    } catch (error: any) {
        res.status(400).json({
            message: error.message || "Error updating recipe",
        });
    }
};

// DELETE RECIPE
export const deleteRecipe = async (req: Request, res: Response) => {
    try {
        const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);

        if (!deletedRecipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        res.status(200).json({ message: "Recipe deleted successfully" });
    } catch (error: any) {
        res.status(500).json({
            message: error.message || "Error deleting recipe",
        });
    }
};