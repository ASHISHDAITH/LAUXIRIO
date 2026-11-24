import { Pool } from "pg";

const globalForPool = globalThis as typeof globalThis & { lauxirioPool?: Pool };

export function getPool() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("DATABASE_URL is not configured.");

  if (!globalForPool.lauxirioPool) {
    globalForPool.lauxirioPool = new Pool({
      connectionString,
      max: 5,
      idleTimeoutMillis: 10_000,
      connectionTimeoutMillis: 5_000,
      application_name: "lauxirio",
    });
  }
  return globalForPool.lauxirioPool;
}
