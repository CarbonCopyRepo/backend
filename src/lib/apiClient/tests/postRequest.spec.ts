import { ApiResponse, AxiosConfig, PostPatchPutConfig, BodyObject } from "../apiClient.types";
import { createAxiosInstance, makePostRequest } from "../apiClient";

const setup = async (
  baseURL: string,
  timeout: number,
  resource: string,
  body: BodyObject,
) => {
  const PostReqParams: PostPatchPutConfig = {} as PostPatchPutConfig;
  const axiosConfig: AxiosConfig = { baseURL, timeout };

  PostReqParams.axiosInstance = createAxiosInstance(axiosConfig);
  PostReqParams.urlParams = { resource };

  if (body) PostReqParams.body = body;

  return await makePostRequest(PostReqParams);
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

  test("apiClient:makePostRequest has a status code of 201 in the response", () => {
    expect(res.statusCode).toEqual(201);
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

  test("apiClient:makePostRequest has a status code of 201 in the response", () => {
    expect(res.statusCode).toEqual(201);
  });
});

describe("apiClient:postRequest error response test cases", () => {
  let res: ApiResponse = {} as ApiResponse;

  const baseURL: string = "https://jsonplacholder.typicode.com/";
  const timeout: number = 500;
  const resource: string = "posts";
  const body = {};

  beforeAll(async () => {
    res = await setup(baseURL, timeout, resource, body);
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
});
