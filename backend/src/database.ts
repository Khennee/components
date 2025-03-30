import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export const test_pool = new Pool({
  connectionString: process.env.TESTING_DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export const getPool = () => (process.env.NODE_ENV === "test" ? test_pool : pool);
