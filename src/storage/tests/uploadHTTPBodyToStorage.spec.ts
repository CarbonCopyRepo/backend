import { ApiResponse } from "../../lib/apiClient/apiClient.types";
import { HTTPBody } from "../domain/storage.types";
import { describe, expect, test } from "@jest/globals";
import { uploadHTTPResponseToStorage } from "../domain/uploadHTTPBodyToStorage";

const testBody: HTTPBody = {
  latitude: 101,
  longitude: 101,
};

describe("Upload body to storage bucket", () => {
  let res: ApiResponse = {} as ApiResponse;

  beforeAll(async () => {
    res = await uploadHTTPResponseToStorage(testBody);
  }, 500);
  test("uploadResponseToBucket: uploads successfully", () => {
    expect(res.statusCode).toEqual(201);
  });
});
