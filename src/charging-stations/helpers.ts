import { GEOCODE_CONFIG } from "../lib/constants";

export const geoCodeAddress = (address: string) => {
  // Basic validation
  if (!address || address.trim().length === 0) {
    throw new Error("Invalid address specified");
  }

  let errorMessage: string | null = null;
  let encodedAddress: string | null = null;
  let response: string | null = null;

  // Encode the address to a URI string as the geocoding API expects it
  try {
    encodedAddress = encodeURIComponent(address);
  } catch (error) {
    if (error instanceof URIError) {
      errorMessage = "Exception occurred while encoding address";
    } else {
      errorMessage = "Unexpected error occurred while encoding address";
    }
  }

  // Construct the geocode api request
  if (encodedAddress && !errorMessage) {
    response = getGeoCodeRequestUrl();
  }

  return {
    baseUrl: response,
    error: errorMessage,
  };
};

export const getGeoCodeRequestUrl = () => {
  const { BASE_URL, ENDPOINT } = GEOCODE_CONFIG;
  return `${BASE_URL}${ENDPOINT}`;
};
