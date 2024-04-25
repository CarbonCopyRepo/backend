import axios from "axios";
import { HERE_API_CONFIG } from "../lib/constants";
import { BodyObject } from "../lib/apiClient/apiClient.types";

export const getChargingStationsForLatLong = async (
  lat: number,
  long: number,
) => {
  let data: BodyObject[] = [];
  let errorMsg: string | null = null;
  const baseUrl = getStationsRequestUrl();

  try {
    const response = await axios.get(baseUrl, {
      params: getStationQueryParams(lat, long),
    });

    data = response?.data?.items || [];
  } catch (error) {
    errorMsg = `Unexpected error occurred while fetching charging stations for ${lat},${long}: ${error}`;
    console.log(errorMsg);
  }

  return {
    data,
    error: errorMsg,
  };
};

const getStationsRequestUrl = () => {
  const { BASE_URL, ENDPOINT } = HERE_API_CONFIG;
  return `${BASE_URL}${ENDPOINT}`;
};

const getStationQueryParams = (lat: number, long: number) => {
  const { LIMIT, CATEGORIES } = HERE_API_CONFIG;

  return {
    at: `${lat},${long}`,
    limit: LIMIT,
    categories: CATEGORIES.join(","),
    apiKey: process.env.HERE_API_KEY,
  };
};
