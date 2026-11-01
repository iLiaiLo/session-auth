import { Pool } from "pg";
import dotenv from "dotenv";
import createUsersSchema from "../queries/CREATE_USERS_SCHEMA.js";
import createUsersTable from "../queries/CREATE_USERS_TABLE.js";

dotenv.config();

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.DB_PORT,
});

const rollbackTransaction = async (client) => {
  if (!client) {
    throw new Error("Database client is not available");
  }
  try {
    await client.query("ROLLBACK");
  } catch (error) {
    console.error("Rollback failed:", error.message);
  }
};

const connectToDb = async () => {
  let client;
  try {
    client = await pool.connect();
    await client.query("BEGIN");
    await client.query(createUsersSchema);
    await client.query(createUsersTable);

    await client.query("COMMIT");

    console.log("successfully connected to database!");
  } catch (error) {
    console.log("error during database connection " + error.message);
    await rollbackTransaction(client);
    throw error;
  } finally {
    if (client) {
      client.release();
    }
  }
};

export { connectToDb, pool };
