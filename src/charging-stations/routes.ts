import { Router, Request, Response } from "express";
import axios from "axios";

import { geoCodeEndPoint } from "./helpers";

//INFO: cs is short form for charging station
//TODO: Handle scenario when address is a long empty string
const csRouter = Router();

csRouter.get("/list", async (req: Request, res: Response) => {
  const address = req?.query?.location || null;
  let errorMsg: string | null = null;
  let data = {};

  if (!address) {
    errorMsg = "Address not found in query parameters";
    return res.status(400).json({ data: [], error: errorMsg });
  }

  const { baseUrl, error } = geoCodeEndPoint(address as string);

  if (error || !baseUrl) {
    return res.status(400).json({ data: [], error });
  }

  try {
    const response = await axios.get(baseUrl as string, {
      params: {
        text: address,
        apiKey: process.env.GEOCODE_API_KEY,
      },
    });

    data = response.data;
  } catch (error) {
    errorMsg = `Unexpected error occurred while geocoding ${address}: ${error}`;
    console.log(errorMsg);

    return res.status(500).json({ data: [], error: errorMsg });
  }

  res.status(200).json({ data, error: errorMsg });
});

export default csRouter;
