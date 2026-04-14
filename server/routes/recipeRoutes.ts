import express from "express";
import {
    createRecipe,
    getRecipes,
    getRecipeById,
    updateRecipe,
    deleteRecipe,
} from "../controllers/recipeController";

const router = express.Router();

// CREATE
router.post("/", createRecipe);

// READ ALL
router.get("/", getRecipes);

// READ ONE
router.get("/:id", getRecipeById);

// UPDATE
router.put("/:id", updateRecipe);

// DELETE
router.delete("/:id", deleteRecipe);

export default router;