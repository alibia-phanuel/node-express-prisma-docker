import Database from "better-sqlite3";

// Crée une base de données SQLite en mémoire
const db = new Database(":memory:");

// --- Création de la table "user" ---
db.exec(`
  CREATE TABLE user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  )
`);

// --- Création de la table "todos" ---
db.exec(`
  CREATE TABLE todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    task TEXT,
    complete BOOLEAN DEFAULT 0,
    FOREIGN KEY(user_id) REFERENCES user(id)
  )
`);

export default db;
