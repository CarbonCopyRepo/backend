import axios from "axios";

import { GEOCODE_CONFIG, GEOCODING_ERROR_TYPES } from "../lib/constants";
import { BodyObject } from "../lib/apiClient/apiClient.types";

export const geoCodeAddress = async (address: string) => {
  const error: BodyObject = { type: "", message: "" };
  const response = { data: [], error };

  // If address is not passed as a query parameter in the GET request
  if (!address) {
    error.type = GEOCODING_ERROR_TYPES.ADDRESS_NOT_FOUND;
    error.message = "Address not found in query parameters";
    return response;
  }

  // Get the endpoint to invoke the geocode API
  const { baseUrl, error: geoCodingError } = getGeoCodeEndPoint(
    address as string,
  );

  // If there are errors in obtaining the endpoint to the geocode API
  if (geoCodingError || !baseUrl) {
    error.type = GEOCODING_ERROR_TYPES.ENDPOINT_ERROR;
    error.message = geoCodingError as string;

    return response;
  }

  // Perform the geocoding given an input address
  const { data: coords, error: latLongError } = await getLatLongForAddress(
    baseUrl,
    address as string,
  );

  if (latLongError) {
    error.type = GEOCODING_ERROR_TYPES.API_ERROR;
    error.message = latLongError as string;
    return response;
  }

  // @ts-ignore
  response.data = coords;
  return response;
};

const getGeoCodeEndPoint = (address: string) => {
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

const getLatLongForAddress = async (baseUrl: string, address: string) => {
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
