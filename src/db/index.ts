import { Pool } from "pg";
import config from "../config/index.js";

export const pool = new Pool({
  connectionString: config.connectionString,
});

export const initDb = async () => {
  try {
    await pool.query(`
            
            CREATE TABLE IF NOT EXISTS users(
            
              id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role VARCHAR(20) DEFAULT 'contributor' CHECK (role IN ('contributor', 'maintainer')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
            
            ) 
            `);
    console.log("database created successfully");
  } catch (error) {
    console.log(error);
  }
};
