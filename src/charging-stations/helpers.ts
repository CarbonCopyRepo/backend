import { GEOCODE_CONFIG } from "../lib/constants";

export const geoCodeEndPoint = (address: string) => {
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

const getGeoCodeRequestUrl = () => {
  const { BASE_URL, ENDPOINT } = GEOCODE_CONFIG;
  return `${BASE_URL}${ENDPOINT}`;
};
