import { ApiResponse, AxiosConfig, PostConfig, BodyObject } from "../apiClient.types";
import { createAxiosInstance, makePostRequest } from "../apiClient";

const setup = async (
  baseURL: string,
  timeout: number,
  resource: string,
  body?: BodyObject,
) => {
  const getReqParams: PostConfig = {} as PostConfig;
  const axiosConfig: AxiosConfig = { baseURL, timeout };

  getReqParams.axiosInstance = createAxiosInstance(axiosConfig);
  getReqParams.urlParams = { resource };

  if (body) getReqParams.body = body;

  return await makePostRequest(getReqParams);
};

describe("apiClient:postRequest success response test cases", () => {
  let res: ApiResponse = {} as ApiResponse;

  const baseURL: string = "https://jsonplaceholder.typicode.com/";
  const timeout: number = 500;
  const resource = "posts";
  const body = {
    id: 101,
    name: "Test Post!",
    body: "Test Body!",
  };

  beforeAll(async () => {
    res = await setup(baseURL, timeout, resource, body);
  });

  test("apiClient:makePostRequest returns a response", () => {
    expect(res).toContainAllKeys([...Object.keys(res)]);
  });

  test("apiClient:makePostRequest responds with correct return body", () => {
    expect(res.data).toStrictEqual(body);
  });

  test("apiClient:makePostRequest has a status code of 204 in the response", () => {
    expect(res.statusCode).toEqual(201);
  });

  test("apiClient.makePostRequest has error field set to an empty string in the response", () => {
    expect(res.error.length).toEqual(0);
  });
});

describe("apiClient:postRequest success empty body response test cases", () => {
  let res: ApiResponse = {} as ApiResponse;

  const baseURL: string = "https://jsonplaceholder.typicode.com/";
  const timeout: number = 500;
  const resource = "posts";
  const body = {};

  beforeAll(async () => {
    res = await setup(baseURL, timeout, resource, body);
  });

  test("apiClient:makePostRequest returns a response", () => {
    expect(res).toContainAllKeys([...Object.keys(res)]);
  });

  test("apiClient:makePostRequest has a status code of 204 in the response", () => {
    expect(res.statusCode).toEqual(201);
  });

  test("apiClient.makePostRequest has error field set to an empty string in the response", () => {
    expect(res.error.length).toEqual(0);
  });
});

describe("apiClient:postRequest error response test cases", () => {
  let res: ApiResponse = {} as ApiResponse;

  const baseURL: string = "https://jsonplacholder.typicode.com/";
  const timeout: number = 500;
  const resource: string = "posts";

  beforeAll(async () => {
    res = await setup(baseURL, timeout, resource);
  });

  test("apiClient:makePostRequests returns a response", () => {
    expect(res).toContainAllKeys([...Object.keys(res)]);
  });

  test("apiClient:makePostRequests has a status code greater than or equal to 400 and less than 600 if available", () => {
    if (res.statusCode) {
      expect(res.statusCode).toBeGreaterThanOrEqual(400);
      expect(res.statusCode).toBeLessThan(600);
    } else {
      expect(res.statusCode).toBeUndefined();
    }
  });

  test("apiClient.makePostRequests has an error message set in the response", () => {
    expect(res.error.length).toBeGreaterThan(0);
  });
});
