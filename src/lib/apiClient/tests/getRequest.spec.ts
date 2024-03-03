import { ApiResponse, AxiosConfig, GetDeleteConfig } from "../apiClient.types";
import { createAxiosInstance, makeGetRequest } from "../apiClient";

const setup = async (baseURL: string, timeout: number, resource: string) => {
  const getReqParams: GetDeleteConfig = {} as GetDeleteConfig;
  const axiosConfig: AxiosConfig = { baseURL, timeout };

  getReqParams.axiosInstance = createAxiosInstance(axiosConfig);
  getReqParams.urlParams = { resource };

  return await makeGetRequest(getReqParams);
};

describe("apiClient:getRequest success response test cases", () => {
  let res: ApiResponse = {} as ApiResponse;

  const baseURL: string = "https://jsonplaceholder.typicode.com/";
  const timeout: number = 500;
  const resource = "albums";

  beforeAll(async () => {
    res = await setup(baseURL, timeout, resource);
  });

  test("apiClient:makeGetRequest returns a response", () => {
    expect(res).toContainAllKeys([...Object.keys(res)]);
  });

  test("apiClient:makeGetRequest has a status code of 200 in the response", () => {
    expect(res.statusCode).toEqual(200);
  });

  test("apiClient.makeGetRequest has error field set to an empty string in the response", () => {
    expect(res.error.length).toEqual(0);
  });
});

describe("apiClient:getRequest error response test cases", () => {
  let res: ApiResponse = {} as ApiResponse;

  const baseURL: string = "https://jsonplacholder.typicode.com/";
  const timeout: number = 500;
  const resource: string = "album";

  beforeAll(async () => {
    res = await setup(baseURL, timeout, resource);
  });

  test("apiClient:makeGetRequest returns a response", () => {
    expect(res).toContainAllKeys([...Object.keys(res)]);
  });

  test("apiClient:makeGetRequest has a status code greater than or equal to 400 and less than 600 if available", () => {
    if (res.statusCode) {
      expect(res.statusCode).toBeGreaterThanOrEqual(400);
      expect(res.statusCode).toBeLessThan(600);
    } else {
      expect(res.statusCode).toBeUndefined();
    }
  });

  test("apiClient.makeGetRequest has an error message set in the response", () => {
    expect(res.error.length).toBeGreaterThan(0);
  });
});
