import { readFile } from "node:fs/promises";
import pg from "pg";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("DATABASE_URL is required to apply the database schema.");
  process.exitCode = 1;
} else {
  const pool = new pg.Pool({ connectionString, max: 1, application_name: "lauxirio-migrations" });
  try {
    const schema = await readFile(new URL("../docs/database.sql", import.meta.url), "utf8");
    await pool.query(schema);
    console.log("Lauxirio appointment schema applied.");
  } catch (error) {
    console.error("Could not apply the Lauxirio database schema:", error instanceof Error ? error.message : "Unknown error.");
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}
