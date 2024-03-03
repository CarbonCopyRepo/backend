import { AxiosInstance } from "axios";
import { AxiosConfig } from "../apiClient.types";
import { createAxiosInstance } from "../apiClient";

describe("createAxiosInstance basic test cases", () => {
  let axiosInstance: AxiosInstance;

  beforeAll(() => {
    const axiosConfig: AxiosConfig = {
      baseURL: "https://jsonplaceholder.typicode.com",
      timeout: 500,
    };

    axiosInstance = createAxiosInstance(axiosConfig);
  });

  test("apiClient:createAxiosInstance returns a custom axios instance", () => {
    expect(axiosInstance).not.toBeNull();
    expect(axiosInstance).toBeDefined();

    expect(axiosInstance.defaults).toBeObject();
    expect(axiosInstance.defaults).toBeDefined();
  });

  test("apiClient:createAxiosInstance has a baseURL property that is not null or undefined", () => {
    expect(axiosInstance.defaults.baseURL).not.toBeNil();
  });

  test("apiClient:createAxiosInstance has a baseURL property that is not empty", () => {
    expect(axiosInstance.defaults.baseURL).not.toBeEmpty();
  });

  test("apiClient:createAxiosInstance has a timeout value greater than 0", () => {
    expect(axiosInstance.defaults.timeout).toBeGreaterThan(0);
  });

  test("apiClient:createAxiosInstance has default headers when no custom headers are passed", () => {
    expect(axiosInstance.defaults.headers).toBeObject();
    expect(axiosInstance.defaults.headers).not.toBeEmptyObject();
  });

  test("apiClient:createAxiosInstance has default response type of json when no response type is passed", () => {
    expect(axiosInstance.defaults.responseType).toEqual("json");
  });
});

describe("custom header functionality", () => {
  let axiosInstance: AxiosInstance;

  beforeEach(() => {
    const axiosConfig: AxiosConfig = {
      baseURL: "https://jsonplaceholder.typicode.com",
      timeout: 500,
      headers: { hello: "world", hello2: "fine" },
    };

    axiosInstance = createAxiosInstance(axiosConfig);
  });

  test("apiClient:createAxiosInstance has custom headers appended to default headers when custom headers are passed", () => {
    expect(axiosInstance.defaults.headers).toContainKey("hello");
    expect(axiosInstance.defaults.headers).toContainKey("hello2");
    expect(axiosInstance.defaults.headers.hello).toEqual("world");
    expect(axiosInstance.defaults.headers.hello2).toEqual("fine");
  });
});

describe("response type functionality", () => {
  let axiosInstance: AxiosInstance;

  beforeEach(() => {
    const axiosConfig: AxiosConfig = {
      baseURL: "https://jsonplaceholder.typicode.com",
      timeout: 500,
      headers: { hello: "world", hello2: "fine" },
      responseType: "blob",
    };

    axiosInstance = createAxiosInstance(axiosConfig);
  });

  test("apiClient:createAxiosInstance has the custom response type set when response type is passed", () => {
    expect(axiosInstance.defaults.responseType).toEqual("blob");
  });
});

test("apiClient:createAxiosInstance throws an exception when baseURL is empty, null or undefined", () => {
  const axiosConfig: AxiosConfig = {
    baseURL: "",
    timeout: 500,
  };

  expect(() => createAxiosInstance(axiosConfig)).toThrow(Error);
});

test("apiClient:createAxiosInstance throws an exception when timeout value is equal to 0", () => {
  const axiosConfig: AxiosConfig = {
    baseURL: "hello",
    timeout: 0,
  };

  expect(() => createAxiosInstance(axiosConfig)).toThrow(Error);
});
