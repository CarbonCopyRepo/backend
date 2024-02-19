// Test /users endpoint as an example

import { getSuperTestInstance } from "../../lib/test/test";

const request = getSuperTestInstance();

describe("GET /api/users", () => {
  it("returns a status code of 200", async () => {
    const res = await request.get("/api/users").send();

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ message: "Welcome to the users endpoint !" });
  });
});
