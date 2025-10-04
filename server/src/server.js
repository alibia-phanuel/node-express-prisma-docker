import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import todoRoutes from "./routes/todo.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => res.send("Hello World!"));
app.get("/dashboard", (req, res) => res.send("Dashboard"));

// Routes principales
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`🚀 Le serveur tourne sur http://localhost:${PORT}`);
});
