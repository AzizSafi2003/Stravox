import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
import { ENV } from "../config/env";

if (!ENV.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set in environment variables.");
}

// INITIALIZE CONNECTION TO DATABASE
const pool = new Pool({ connectionString: ENV.DATABASE_URL });

// log when first connection is made:
pool.on("connect", () => {
  console.log("Connected to database");
});

// log when we have an error:
pool.on("error", (err) => {
  console.error("Error connecting to database", err);
});

export const db = drizzle({ client: pool, schema });

/* Using Pool instead of opening/closing connection which are pretty slow we just reuse existing ones. By default its value is 10 but we can update the value which is max: value, in line 11 after ENV.DATABASE_URL separate by comma */
