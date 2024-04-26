import { Connector } from "@google-cloud/cloud-sql-connector";

import { Pool } from "pg";

import { CLOUD_SQL } from "../constants";
import { getConnectionOptions } from "./db.utils";

export async function connect() {
  const { POOL_MIN, POOL_MAX } = CLOUD_SQL;

  const connector = new Connector();

  const connOptions = await connector.getOptions(getConnectionOptions());

  const pool = new Pool({
    ...connOptions,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    min: POOL_MIN,
    max: POOL_MAX,
  });

  return {
    query: (text: string, params?: any) => pool.query(text, params),
    close: () => pool.end(),
  };
}
