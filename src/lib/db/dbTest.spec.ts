import { describe, expect, test } from "@jest/globals";
import { setupConnector } from "./db";

describe("setupConnecter", () => {
  test("setupConnecter: Connect to DB successfully", async () => {
    const connector = await setupConnector();

    console.log(connector);
    expect(connector).toBeDefined();
  });
});
