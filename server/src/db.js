import { Database, DatabaseSync } from "node:sqlite";

// Crée une base de données SQLite en mémoire (elle disparaît à la fermeture du programme)
const db = new DatabaseSync(":memory:");

// --- Création de la table "user" ---
db.exec(`
  CREATE TABLE user (
    id INTEGER PRIMARY KEY AUTOINCREMENT, // ID unique pour chaque utilisateur, auto-incrémenté automatiquement
    username TEXT UNIQUE,                  // Nom d'utilisateur, doit être unique
    password TEXT                          // Mot de passe stocké en texte (dans la vraie vie, hacher avant !)
  )
`);

// --- Création de la table "todos" ---
db.exec(`
  CREATE TABLE todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,   // ID unique pour chaque todo, auto-incrémenté
    user_id INTEGER,                        // Référence vers l'utilisateur qui possède cette tâche
    task TEXT,                              // Description de la tâche
    complete BOOLEAN DEFAULT 0,             // Indique si la tâche est terminée, valeur par défaut 0 (faux)
    FOREIGN KEY(user_id) REFERENCES user(id) // Lien avec la table "user" pour s'assurer que user_id existe
  )
`);

export default db

/*Explications importantes :

1. AUTOINCREMENT : dans SQLite, mettre "INTEGER PRIMARY KEY" suffit généralement pour incrémenter automatiquement.
   "AUTOINCREMENT" garantit que les IDs ne seront jamais réutilisés après suppression.

2. UNIQUE : garantit que deux utilisateurs n'auront pas le même "username".

3. FOREIGN KEY : permet d'assurer l'intégrité référentielle, c'est-à-dire qu'on ne peut pas créer un todo
   avec un user_id qui n'existe pas dans la table "user".

4. BOOLEAN DEFAULT 0 : SQLite n'a pas de type boolean strict, donc 0 = false, 1 = true.

5. ":memory:" : la base est temporaire, idéale pour des tests rapides ou un prototype.
*/
