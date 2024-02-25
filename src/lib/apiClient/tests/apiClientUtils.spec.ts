import { buildQueryParams, buildUrlParams } from "../apiClient.utils";
import { StringObject } from "../apiClient.types";

const baseUrl: string = "https://jsonplaceholder.typicode.com/";
const emptyParam: StringObject = { param1: "", param2: "" };

const emptyParamWithWhiteSpace: StringObject = {
  param1: "                       ",
  param2: "     ",
};

const singleParam: StringObject = { param1: "user" };
const twoParams: StringObject = { param1: "user", param2: "1" };

const multipleParams: StringObject = {
  param1: "user1",
  param2: "co",
  param3: "boulder",
  param4: "1",
};

const baseUrlEmpty: string = "";
const baseUrlEmptyWithSpaces: string = "                    ";

describe("apiClientUtils:buildURLParams test cases", () => {
  test("buildUrlParams returns the updated baseURL when a single URL param is passed", () => {
    const expectedUrl = `${baseUrl}${singleParam["param1"]}`;
    expect(expectedUrl).toEqual(buildUrlParams(baseUrl, singleParam));
  });

  test("buildUrlParams returns the updated baseURL when two URL params are passed", () => {
    const expectedUrl = `${baseUrl}${twoParams["param1"]}/${twoParams["param2"]}`;
    expect(expectedUrl).toEqual(buildUrlParams(baseUrl, twoParams));
  });

  test("buildUrlParams returns the updated baseURL when multiple URL params are passed", () => {
    const keys = Object.keys(multipleParams);
    let modifiedUrl: string = baseUrl;

    for (let i = 0; i < keys.length; i++) {
      const paramValue = multipleParams[keys[i]];
      modifiedUrl += i !== keys.length - 1 ? `${paramValue}/` : `${paramValue}`;
    }

    expect(buildUrlParams(baseUrl, multipleParams)).toEqual(modifiedUrl);
  });

  test("buildUrlParams throws an exception when the baseURL is an empty string", () => {
    expect(() => buildUrlParams(baseUrlEmpty, singleParam)).toThrow(Error);
  });

  test("buildUrlParams throws an exception when the baseURL is an empty string with multiple whitespaces", () => {
    expect(() => buildUrlParams(baseUrlEmptyWithSpaces, singleParam)).toThrow(
      Error,
    );
  });

  test("buildUrlParams returns the same baseURL when the values of URL params object are empty strings", () => {
    expect(buildUrlParams(baseUrl, emptyParam)).toEqual(baseUrl);
  });

  test("buildUrlParams returns the same baseURL when the values of URL params object are empty strings with unlimited whitespaces", () => {
    expect(buildUrlParams(baseUrl, emptyParamWithWhiteSpace)).toEqual(baseUrl);
  });
});

describe("apiClientUtils:buildQueryParams test cases", () => {
  test("buildQueryParams returns the updated baseURL when a single query param is passed", () => {
    const expectedUrl = `${baseUrl}?param1=${singleParam["param1"]}`;
    expect(buildQueryParams(baseUrl, singleParam)).toEqual(expectedUrl);
  });

  test("buildQueryParams returns the updated baseURL when two query params are passed", () => {
    const firstParamVal = twoParams["param1"];
    const secondParamVal = twoParams["param2"];

    const expectedUrl = `${baseUrl}?param1=${firstParamVal}&param2=${secondParamVal}`;
    expect(buildQueryParams(baseUrl, twoParams)).toEqual(expectedUrl);
  });

  test("buildQueryParams returns the updated baseURL when multiple query params are passed", () => {
    const keys = Object.keys(multipleParams);
    let modifiedUrl: string = baseUrl + "?";

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const value = multipleParams[key];

      modifiedUrl +=
        i !== keys.length - 1 ? `${key}=${value}&` : `${key}=${value}`;
    }

    expect(buildQueryParams(baseUrl, multipleParams)).toEqual(modifiedUrl);
  });

  test("buildQueryParams throws an exception when the baseURL is an empty string", () => {
    expect(() => buildQueryParams(baseUrlEmpty, singleParam)).toThrow(Error);
  });

  test("buildQueryParams throws an exception when the baseURL is an empty string with multiple whitespaces", () => {
    expect(() => buildQueryParams(baseUrlEmptyWithSpaces, singleParam)).toThrow(
      Error,
    );
  });

  test("buildQueryParams returns the same baseURL when the values of URL params object are empty strings", () => {
    expect(buildQueryParams(baseUrl, emptyParam)).toEqual(baseUrl);
  });

  test("buildQueryParams returns the same baseURL when the values of URL params object are empty strings with unlimited whitespaces", () => {
    expect(buildQueryParams(baseUrl, emptyParamWithWhiteSpace)).toEqual(
      baseUrl,
    );
  });
});
