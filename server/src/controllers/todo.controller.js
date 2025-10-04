import db from "../db.js";

// Récupérer un todo spécifique
export function getTodos(req, res) {
  try {
    const userId = req.user.id; // récupéré via le JWT
    const stmt = db.prepare("SELECT * FROM todos WHERE user_id = ?");
    const todos = stmt.all(userId);
    res.status(200).json(todos);
  } catch (error) {
    console.error("Erreur getTodos :", error);
    res.status(500).json({ error: "Erreur serveur interne." });
  }
}

// Créer un todo
export function createTodo(req, res) {
  try {
    const { task } = req.body;
    const userId = req.user.id;

    if (!task) return res.status(400).json({ error: "task est requis." });

    const stmt = db.prepare("INSERT INTO todos (user_id, task) VALUES (?, ?)");
    const info = stmt.run(userId, task);

    res
      .status(201)
      .json({ id: info.lastInsertRowid, user_id: userId, task, complete: 0 });
  } catch (error) {
    console.error("Erreur createTodo :", error);
    res.status(500).json({ error: "Erreur serveur interne." });
  }
}

// Mettre à jour un todo
export function updateTodo(req, res) {
  try {
    const { task, complete } = req.body;
    const id = parseInt(req.params.id);
    const userId = req.user.id;

    const stmtCheck = db.prepare(
      "SELECT * FROM todos WHERE id = ? AND user_id = ?"
    );
    const todo = stmtCheck.get(id, userId);
    if (!todo) return res.status(404).json({ error: "Todo non trouvé." });

    const stmt = db.prepare(
      "UPDATE todos SET task = ?, complete = ? WHERE id = ? AND user_id = ?"
    );
    stmt.run(task || todo.task, complete ?? todo.complete, id, userId);

    res.status(200).json({ message: "Todo mis à jour avec succès." });
  } catch (error) {
    console.error("Erreur updateTodo :", error);
    res.status(500).json({ error: "Erreur serveur interne." });
  }
}

// Supprimer un todo
export function deleteTodo(req, res) {
  try {
    const id = parseInt(req.params.id);
    const userId = req.user.id;

    const stmt = db.prepare("DELETE FROM todos WHERE id = ? AND user_id = ?");
    const info = stmt.run(id, userId);

    if (info.changes === 0)
      return res.status(404).json({ error: "Todo non trouvé." });

    res.status(200).json({ message: "Todo supprimé avec succès." });
  } catch (error) {
    console.error("Erreur deleteTodo :", error);
    res.status(500).json({ error: "Erreur serveur interne." });
  }
}

// Supprimer tous les todos
export function deleteAllTodos(req, res) {
  try {
    const userId = req.user.id;
    const stmt = db.prepare("DELETE FROM todos WHERE user_id = ?");
    stmt.run(userId);

    res.status(200).json({ message: "Tous les todos supprimés." });
  } catch (error) {
    console.error("Erreur deleteAllTodos :", error);
    res.status(500).json({ error: "Erreur serveur interne." });
  }
}
