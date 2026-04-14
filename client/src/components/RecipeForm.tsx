import { useEffect, useState } from "react";
import API from "../services/api";

const RecipeForm = ({
    onSuccess,
    editingRecipe,
}: {
    onSuccess: () => void;
    editingRecipe: any;
}) => {
    const [form, setForm] = useState({
        title: "",
        description: "",
        ingredients: "",
        category: "Breakfast",
        cookingTime: "",
        difficulty: "Easy",
        imageUrl: "",
    });

    useEffect(() => {
        if (editingRecipe) {
            setForm({
                ...editingRecipe,
                ingredients: editingRecipe.ingredients.join(","),
                cookingTime: editingRecipe.cookingTime.toString(),
            });
        }
    }, [editingRecipe]);

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // 🔥 CHECK IF IMAGE LOADS
    const isValidImageUrl = (url: string): Promise<boolean> => {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = url;

            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        // 🚨 VALIDATE IMAGE
        const isValid = await isValidImageUrl(form.imageUrl);

        if (!isValid) {
            alert("Invalid image URL. Please enter a working image link.");
            return;
        }

        try {
            const data = {
                ...form,
                ingredients: form.ingredients.split(",").map((i) => i.trim()),
                cookingTime: Number(form.cookingTime),
            };

            if (editingRecipe) {
                await API.put(`/recipes/${editingRecipe._id}`, data);
                alert("Recipe updated!");
            } else {
                await API.post("/recipes", data);
                alert("Recipe added!");
            }

            setForm({
                title: "",
                description: "",
                ingredients: "",
                category: "Breakfast",
                cookingTime: "",
                difficulty: "Easy",
                imageUrl: "",
            });

            onSuccess();
        } catch (error: any) {
            console.error(error.response?.data || error.message);
            alert("Error occurred");
        }
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <h2>{editingRecipe ? "Edit Recipe" : "Add Recipe"}</h2>

            <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />

            <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required />

            <input name="ingredients" placeholder="Ingredients (comma separated)" value={form.ingredients} onChange={handleChange} required />

            <select name="category" value={form.category} onChange={handleChange}>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Dessert">Dessert</option>
            </select>

            <input name="cookingTime" type="number" placeholder="Cooking Time" value={form.cookingTime} onChange={handleChange} required />

            <select name="difficulty" value={form.difficulty} onChange={handleChange}>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
            </select>

            <input
                name="imageUrl"
                placeholder="Paste image URL (Unsplash, etc.)"
                value={form.imageUrl}
                onChange={handleChange}
                required
            />

            <button type="submit">
                {editingRecipe ? "Update Recipe" : "Add Recipe"}
            </button>
        </form>
    );
};

export default RecipeForm;