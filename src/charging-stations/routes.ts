import { Router, Request, Response } from "express";

import { getGeoCodeEndPoint, getLatLongForAddress } from "./geocode";
import { getChargingStationsForLatLong } from "./stations";

//INFO: cs is short form for charging station
//TODO: Handle scenario when address is a long empty string
const csRouter = Router();

csRouter.get("/list", async (req: Request, res: Response) => {
  const address = req?.query?.location || null;
  let errorMsg: string | null = null;

  // If address is not passed as a query parameter in the GET request
  if (!address) {
    errorMsg = "Address not found in query parameters";
    return res.status(400).json({ data: [], error: errorMsg });
  }

  // Get the endpoint to invoke the geocode API
  const { baseUrl, error: geoCodingError } = getGeoCodeEndPoint(
    address as string,
  );

  // If there are errors in obtaining the endpoint to the geocode API
  if (geoCodingError || !baseUrl) {
    return res.status(400).json({ data: [], error: geoCodingError });
  }

  // Perform the geocoding given an input address
  const { data: coords, error: latLongError } = await getLatLongForAddress(
    baseUrl,
    address as string,
  );

  if (latLongError) {
    res.status(500).json({ data: [], error: latLongError });
  }

  // Get the list of charging stations for the (lat, long) pair
  const { data: stations, error: stationsError } =
    await getChargingStationsForLatLong(coords[0].lat, coords[0].lon);

  if (stationsError) {
    res.status(500).json({ data: [], error: stationsError });
  }

  res.status(200).json({ data: stations, error: "" });
});

export default csRouter;
