import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import recipeRoutes from "./routes/recipeRoutes";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/recipes", recipeRoutes);

app.get("/", (req, res) => {
    res.send("Recipe Manager API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});