import "dotenv/config";
import { sql } from "drizzle-orm";

import { db } from "./index.js";

async function resetDatabase() {
  await db.execute(
    sql`TRUNCATE TABLE order_items, orders, sessions, users, products RESTART IDENTITY CASCADE`,
  );
}

resetDatabase()
  .then(() => {
    console.log("Database reset complete");
  })
  .catch((error) => {
    console.error("Database reset failed", error);
    process.exitCode = 1;
  });
