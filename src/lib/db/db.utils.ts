import {
  AuthTypes,
  ConnectionOptions,
  IpAddressTypes,
} from "@google-cloud/cloud-sql-connector";

export const getConnectionOptions = () => {
  return {
    instanceConnectionName: process?.env?.CONNECTION_NAME || "",
    ipType: IpAddressTypes.PUBLIC,
    authType: AuthTypes.IAM,
  } as ConnectionOptions;
};
