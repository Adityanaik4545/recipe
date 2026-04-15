export interface Recipe {
    _id: string;
    title: string;
    description: string;
    ingredients: string[];
    category: string;
    cookingTime: number;
    difficulty: string;
}