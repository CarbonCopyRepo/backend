import { Router, Request, Response } from "express";

import { geoCodeAddress } from "./geocode";
import { getChargingStationsForLatLong } from "./stations";
import { GEOCODING_ERROR_TYPES } from "../lib/constants";

//INFO: cs is short form for charging station
//TODO: Handle scenario when address is a long empty string
const csRouter = Router();

csRouter.get("/list", async (req: Request, res: Response) => {
  const address = req?.query?.location || null;
  const { data: coords, error } = await geoCodeAddress(address as string);

  // If an error was encountered while geocoding the address
  if (error.type != "") {
    const { type, message } = error;

    if (type === GEOCODING_ERROR_TYPES.ADDRESS_NOT_FOUND) {
      return res.status(400).json({ data: [], error: message });
    } else {
      return res.status(500).json({ data: [], error: message });
    }
  }

  // Get the list of charging stations for the (lat, long) pair
  const { data: stations, error: stationsError } =
    await getChargingStationsForLatLong(coords[0]["lat"], coords[0]["lon"]);

  if (stationsError) {
    res.status(500).json({ data: [], error: stationsError });
  }

  res.status(200).json({ data: stations, error: "" });
});

csRouter.get("/geocode", async (req: Request, res: Response) => {
  const address = req?.query?.location || null;
  const { data: coords, error } = await geoCodeAddress(address as string);

  // If an error was encountered while geocoding the address
  if (error.type != "") {
    const { type, message } = error;

    if (type === GEOCODING_ERROR_TYPES.ADDRESS_NOT_FOUND) {
      return res.status(400).json({ data: [], error: message });
    } else {
      return res.status(500).json({ data: [], error: message });
    }
  }

  return res.status(200).json({ data: coords, error: "" });
});

export default csRouter;
