import { useEffect, useState } from "react";
import API from "./services/api";
import type { Recipe } from "./types/Recipe";
import RecipeCard from "./components/RecipeCard";
import RecipeForm from "./components/RecipeForm";

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [showForm, setShowForm] = useState(false);

  const fetchRecipes = async () => {
    const res = await API.get("/recipes");
    setRecipes(res.data);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className="container">
      <h1>🍽 Recipe Manager</h1>

      {/* 🔥 Add Button */}
      <button className="add-btn" onClick={() => setShowForm(true)}>
        ➕ Add Recipe
      </button>

      {/* 🔥 Modal Form */}
      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <RecipeForm
              onSuccess={() => {
                fetchRecipes();
                setEditingRecipe(null);
                setShowForm(false);
              }}
              editingRecipe={editingRecipe}
            />

            <button className="close-btn" onClick={() => setShowForm(false)}>
              ❌ Close
            </button>
          </div>
        </div>
      )}

      {/* 🔥 Cards */}
      <div className="grid">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            recipe={recipe}
            onDelete={fetchRecipes}
            onEdit={() => {
              setEditingRecipe(recipe);
              setShowForm(true);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default App;