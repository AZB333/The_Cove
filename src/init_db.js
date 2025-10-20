import dotenv from "dotenv";
import pkg from "pg";
dotenv.config();

const { Pool } = pkg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(50),
      email VARCHAR(100)
    );
  `);
  console.log("Database initialized");
  pool.end();
}

initDB();
