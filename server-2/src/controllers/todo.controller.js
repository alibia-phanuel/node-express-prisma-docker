import prisma from "../../prismaClinent.js";

// Récupérer les todos de l'utilisateur connecté
export async function getTodos(req, res) {
  try {
    const userId = req.user.id;

    const todos = await prisma.todo.findMany({
      where: { userId },
      orderBy: { id: "desc" },
    });

    res.status(200).json(todos);
  } catch (error) {
    console.error("Erreur getTodos :", error);
    res.status(500).json({ error: "Erreur serveur interne." });
  }
}

// Créer un nouveau todo
export async function createTodo(req, res) {
  try {
    const { task } = req.body;
    const userId = req.user.id;

    if (!task) {
      return res.status(400).json({ error: "Le champ 'task' est requis." });
    }

    const todo = await prisma.todo.create({
      data: {
        task,
        userId,
      },
    });

    res.status(201).json(todo);
  } catch (error) {
    console.error("Erreur createTodo :", error);
    res.status(500).json({ error: "Erreur serveur interne." });
  }
}

// Mettre à jour un todo
export async function updateTodo(req, res) {
  try {
    const id = parseInt(req.params.id);
    const { task, complete } = req.body;
    const userId = req.user.id;

    const todo = await prisma.todo.findFirst({
      where: { id, userId },
    });

    if (!todo) {
      return res.status(404).json({ error: "Todo non trouvé." });
    }

    await prisma.todo.update({
      where: { id },
      data: {
        task: task ?? todo.task,
        complete: complete ?? todo.complete,
      },
    });

    res.status(200).json({ message: "Todo mis à jour avec succès." });
  } catch (error) {
    console.error("Erreur updateTodo :", error);
    res.status(500).json({ error: "Erreur serveur interne." });
  }
}

// Supprimer un todo
export async function deleteTodo(req, res) {
  try {
    const id = parseInt(req.params.id);
    const userId = req.user.id;

    const todo = await prisma.todo.findFirst({
      where: { id, userId },
    });

    if (!todo) {
      return res.status(404).json({ error: "Todo non trouvé." });
    }

    await prisma.todo.delete({ where: { id } });

    res.status(200).json({ message: "Todo supprimé avec succès." });
  } catch (error) {
    console.error("Erreur deleteTodo :", error);
    res.status(500).json({ error: "Erreur serveur interne." });
  }
}

// Supprimer tous les todos de l'utilisateur
export async function deleteAllTodos(req, res) {
  try {
    const userId = req.user.id;

    await prisma.todo.deleteMany({
      where: { userId },
    });

    res.status(200).json({ message: "Tous les todos supprimés." });
  } catch (error) {
    console.error("Erreur deleteAllTodos :", error);
    res.status(500).json({ error: "Erreur serveur interne." });
  }
}
