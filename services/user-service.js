const sqlite3 = require("sqlite3").verbose();
import jwt from "jsonwebtoken";

class UserService {
  constructor() {
    // Connect to SQLite database (create a new file if it doesn't exist)
    this.db = new sqlite3.Database("./database.db");

    // Create a 'users' table if it doesn't exist
    this.db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      )
    `);

    this.db.run(`
      CREATE TABLE IF NOT EXISTS login_sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        session_token TEXT UNIQUE NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);
  }

  async checkUserExistence(email) {
    return new Promise((resolve, reject) => {
      this.db.get("SELECT COUNT(*) as count FROM users WHERE email = ?", [email], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row.count > 0);
        }
      });
    });
  }

  async createUser(email, password) {
    return new Promise((resolve, reject) => {
      this.db.run("INSERT INTO users (email, password) VALUES (?, ?)", [email, password], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  async loginUser(email, password) {
    return new Promise((resolve, reject) => {
      this.db.get("SELECT id FROM users WHERE email = ? AND password = ?", [email, password], (err, row) => {
        if (err) {
          reject(err);
        } else if (row) {
          const user = { id: row.id, email };
          const sessionToken = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" }); // Set expiration time as needed

          this.db.run(
            "INSERT INTO login_sessions (user_id, session_token) VALUES (?, ?)",
            [row.id, sessionToken],
            (err) => {
              if (err) {
                reject(err);
              } else {
                resolve(sessionToken);
              }
            }
          );
        } else {
          resolve(null);
        }
      });
    });
  }

  async verifySession(sessionToken) {
    return new Promise((resolve, reject) => {
      jwt.verify(sessionToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          const { email } = decoded;
          resolve(email);
        }
      });
    });
  }
}

export default UserService;
