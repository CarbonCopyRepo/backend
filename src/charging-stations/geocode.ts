import axios from "axios";

import { GEOCODE_CONFIG } from "../lib/constants";
import { BodyObject } from "../lib/apiClient/apiClient.types";

export const getGeoCodeEndPoint = (address: string) => {
  let errorMessage: string | null = null;
  let response: string | null = null;

  // Basic validation
  try {
    const decodedAddr = decodeURIComponent(address);

    if (decodedAddr.length === 0) {
      errorMessage = "Invalid address specified";
    }
  } catch (error) {
    if (error instanceof URIError) {
      errorMessage = "Address is not encoded properly";
    } else {
      errorMessage = "Unexpected error occurred while decoding address";
    }
  }

  // Construct the geocode api request
  if (!errorMessage) {
    response = getGeoCodeRequestUrl();
  }

  return {
    baseUrl: response,
    error: errorMessage,
  };
};

export const getLatLongForAddress = async (
  baseUrl: string,
  address: string,
) => {
  let data = [];
  let errorMsg: string | null = null;

  const coords = { lat: Infinity, lon: Infinity };

  try {
    const response = await axios.get(baseUrl, {
      params: {
        text: address,
        apiKey: process.env.GEOCODE_API_KEY,
      },
    });

    data = (response?.data?.features as []) || [];

    // @ts-ignore
    if (data.length > 0 && data[0].properties) {
      // @ts-ignore
      const properties = data[0].properties as BodyObject;

      coords.lat = properties.lat as number;
      coords.lon = properties.lon as number;
    }
  } catch (error) {
    errorMsg = `Unexpected error occurred while geocoding ${address}: ${error}`;
    console.log(errorMsg);
  }

  return {
    data: [{ ...coords }],
    error: errorMsg,
  };
};

const getGeoCodeRequestUrl = () => {
  const { BASE_URL, ENDPOINT } = GEOCODE_CONFIG;
  return `${BASE_URL}${ENDPOINT}`;
};
