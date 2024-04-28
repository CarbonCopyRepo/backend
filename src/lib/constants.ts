import { StringObject } from "./apiClient/apiClient.types";

export const GEOCODE_CONFIG = {
  BASE_URL: "https://api.geoapify.com/v1",
  ENDPOINT: "/geocode/search",
};

export const GEOCODING_ERROR_TYPES = {
  ADDRESS_NOT_FOUND: "ADDRESS_NOT_FOUND",
  ENDPOINT_ERROR: "GEOCODE_ENDPOINT_ERROR",
  API_ERROR: "API_ERROR",
};

/**
 *
 * CATEGORIES: We want to show ev Charging Stations and ev Battery Swap Stations
 * The category codes for these are 700-7600-0322 and 700-7600-0325 respectively
 * Docs: https://www.here.com/docs/bundle/geocoding-and-search-api-developer-guide/page/topics-places/places-category-system-full.html
 *
 * LIMIT: defaults to 20 records currently. Can be passed from frontend if needed.
 */
export const HERE_API_CONFIG = {
  BASE_URL: "https://browse.search.hereapi.com/v1",
  ENDPOINT: "/browse",
  CATEGORIES: ["700-7600-0322", "700-7600-0325"],
  LIMIT: 20,
};

export const NUMBERS = {
  MILES_TO_KM: 1.60934,
  AVG_CO2_EMISSIONS_IN_GRAMS_PER_KWH: 527,
  GASOLINE_BTU_PER_GALLON: 114000,
  EV_BTU_PER_KWH: 3412,
};

export const VEHICLE_TYPES: StringObject = {
  REGULAR_GASOLINE: "X",
  PREMIUM_GASOLINE: "Z",
  DIESEL: "D",
  EV: "B",
};

export const CLOUD_SQL = {
  POOL_MIN: 2,
  POOL_MAX: 5,
};
