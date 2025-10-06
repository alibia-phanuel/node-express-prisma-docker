import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import prisma from "../../prismaClinent.js";
import { hashPassword, comparePassword } from "../utils/password.js";

dotenv.config();

// --- Enregistrement d'un utilisateur ---
export async function register(req, res) {
  try {
    const { username, password } = req.body;

    // Validation basique
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username et password sont requis." });
    }

    if (username.length < 3 || /\s/.test(username)) {
      return res.status(400).json({
        error:
          "Le nom d'utilisateur doit contenir au moins 3 caractères sans espaces.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: "Le mot de passe doit contenir au moins 6 caractères.",
      });
    }

    // Vérifier si le user existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return res
        .status(409)
        .json({ error: "Ce nom d'utilisateur est déjà pris." });
    }

    // Hash du mot de passe
    const hashedPassword = await hashPassword(password);

    // Créer l'utilisateur + un premier todo en même temps
    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        todos: {
          create: {
            task: "Hello :) Add your first todo !",
          },
        },
      },
      include: { todos: true },
    });

    return res.status(201).json({
      message: "Utilisateur enregistré avec succès.",
      user: { id: newUser.id, username: newUser.username },
    });
  } catch (error) {
    console.error("Erreur lors de l'enregistrement :", error);
    return res.status(500).json({ error: "Erreur serveur interne." });
  }
}

// --- Connexion d'un utilisateur ---
export async function login(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username et password sont requis." });
    }

    const cleanUsername = username.trim();

    const user = await prisma.user.findUnique({
      where: { username: cleanUsername },
    });

    if (!user) {
      return res.status(401).json({ error: "Identifiants invalides." });
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Identifiants invalides." });
    }

    if (!process.env.JWT_SECRET) {
      console.error("❌ JWT_SECRET manquant dans le fichier .env");
      return res.status(500).json({ error: "Erreur serveur." });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Connexion réussie",
      user: { id: user.id, username: user.username },
      token,
    });
  } catch (error) {
    console.error("Erreur lors du login :", error);
    return res.status(500).json({ error: "Erreur serveur interne." });
  }
}
