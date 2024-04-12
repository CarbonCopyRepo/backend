import pg from "pg";
import { Connector, IpAddressTypes } from "@google-cloud/cloud-sql-connector";
const { Pool } = pg;
import { GoogleAuth } from "google-auth-library";

export const setupConnector = async () => {
  const connector = new Connector({
    auth: new GoogleAuth({
      scopes: ["https://www.googleapis.com/auth/sqlservice.admin"],
      projectId: process.env.PROJECT_ID,
      keyFilename: "googleAuthKey.json",
    }),
  });

  const options = await connector.getOptions({
    instanceConnectionName: process.env.INSTANCE_CONNECTION_NAME ?? "",
    ipType: IpAddressTypes.PUBLIC,
  });

  const pool = new Pool({
    ...options,
  });

  return pool;
};
