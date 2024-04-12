export const GEOCODE_CONFIG = {
  BASE_URL: "https://api.geoapify.com/v1",
  ENDPOINT: "/geocode/search",
};

/**
 *
 * CATEGORIES: We want to show EV Charging Stations and EV Battery Swap Stations
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
