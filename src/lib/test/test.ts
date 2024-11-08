import request from "supertest";
import { getExpressServerInstance } from "../server/server";

let superTestInstance: import("supertest/lib/agent");

export const getSuperTestInstance = () => {
  if (!superTestInstance) {
    const app = getExpressServerInstance();
    superTestInstance = request(app);
  }

  return superTestInstance;
};
