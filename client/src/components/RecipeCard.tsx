import type { Recipe } from "../types/Recipe";
import API from "../services/api";

const RecipeCard = ({
    recipe,
    onDelete,
    onEdit,
}: {
    recipe: Recipe;
    onDelete: () => void;
    onEdit: () => void;
}) => {
    const handleDelete = async () => {
        if (!window.confirm("Are you sure?")) return;

        try {
            await API.delete(`/recipes/${recipe._id}`);
            alert("Recipe deleted!");
            onDelete();
        } catch (error) {
            console.error("Delete error", error);
        }
    };

    return (
        <div className="card">
            <img
                src={recipe.imageUrl}
                alt={recipe.title}
                onError={(e) => {
                    (e.target as HTMLImageElement).src =
                        "https://picsum.photos/300";
                }}
            />

            <h2>{recipe.title}</h2>
            <p>{recipe.description}</p>

            <div className="meta">
                <span>{recipe.category}</span>
                <span>{recipe.cookingTime} mins</span>
                <span>{recipe.difficulty}</span>
            </div>

            <button onClick={onEdit} className="edit-btn">
                Edit
            </button>

            <button onClick={handleDelete} className="delete-btn">
                Delete
            </button>
        </div>
    );
};

export default RecipeCard;