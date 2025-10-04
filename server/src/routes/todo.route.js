import express from "express";
import {
  createTodo,
  deleteAllTodos,
  deleteTodo,
  getTodos,
  updateTodo,
} from "../controllers/todo.controller.js";

import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

// 🔒 Appliquer le middleware pour toutes les routes
router.use(authenticate);

router.get("/", getTodos);
// router.get("/:id", getTodo);
router.post("/", createTodo);
router.put("/:id", updateTodo);
router.delete("/", deleteAllTodos);
router.delete("/:id", deleteTodo);

export default router;
