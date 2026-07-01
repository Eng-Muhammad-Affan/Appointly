import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { databaseUrl } from "@/shared/constants/env";

// Import everything explicitly
import * as Schema from "./schemas";


export const client = postgres(databaseUrl, { prepare: false });
const db = drizzle(client, { schema:Schema });
export default db;