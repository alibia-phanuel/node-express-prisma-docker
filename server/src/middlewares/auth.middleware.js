import jwt from "jsonwebtoken";

export function authenticate(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return res.status(401).json({ error: "Token manquant." });
    }

    // Format attendu : "Bearer <token>"
    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({ error: "Format du token invalide." });
    }

    const token = parts[1];

    // Vérifier le token
    if (!process.env.JWT_SECRET) {
      console.error("❌ JWT_SECRET manquant dans le fichier .env");
      return res.status(500).json({ error: "Erreur serveur." });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Token invalide." });
      }

      // On met les infos du user dans req.user
      req.user = decoded;
      next();
    });
  } catch (error) {
    console.error("Erreur middleware auth :", error);
    res.status(500).json({ error: "Erreur serveur interne." });
  }
}
