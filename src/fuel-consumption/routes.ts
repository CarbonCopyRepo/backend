import { Router, Request, Response } from "express";
import { connect } from "../lib/db/db";

import { isValidVehicleType } from "../vehicles/vehicles.utils";
import { convertToBTUs } from "./fuel-consumption.utils";

import {
  buildAvgYearlyConsumptionForMakeAndModelQuery,
  buildAvgYearlyConsumptionQuery,
} from "./queries/fuel-consumption.queries";

const fuelConsumptionRouter = Router();

fuelConsumptionRouter.get("/yearly", async (req: Request, res: Response) => {
  const vehicleType = (req?.query?.vehicleType || null) as string;
  const miles = parseInt(req?.query?.miles as string) || 50;

  let errorMsg = "";

  if (!isValidVehicleType(vehicleType)) {
    errorMsg = `Vehicle type not found (or) ${vehicleType} is not a valid type`;
    return res.status(400).json({ data: [], error: errorMsg });
  }

  const yearlyConsumptionQuery = buildAvgYearlyConsumptionQuery(
    vehicleType as string,
  );

  const { query, close } = await connect();

  try {
    const dbResponse = await query(yearlyConsumptionQuery);

    console.log(
      `Retrieved ${dbResponse.rows.length} rows of yearly fuel consumption values 
        for vehicle_type: ${vehicleType}`,
    );

    const normalizedConsumptionValues = convertToBTUs(
      dbResponse.rows,
      miles,
      vehicleType,
    );

    const data = normalizedConsumptionValues.map((row) => {
      return {
        year: row.year,
        consumption: row.consumption,
      };
    });

    return res.status(200).json({ data, error: "" });
  } catch (error) {
    console.log(
      `Error while retrieving yearly emissions for vehicle_type ${vehicleType} - ${error}`,
    );

    errorMsg = `Unexpected error occurred while retrieving yearly emissions for vehicle_type ${vehicleType}`;

    return res.status(500).json({ data: [], error: errorMsg });
  } finally {
    await close();
  }
});

fuelConsumptionRouter.get(
  "/yearlyByMake",
  async (req: Request, res: Response) => {
    const vehicleType = (req?.query?.vehicleType || null) as string;
    const make: string = (req?.query?.make || null) as string;
    const model: string = (req?.query?.model || null) as string;

    const miles = parseInt(req?.query?.miles as string) || 50;

    let errorMsg = "";

    if (!isValidVehicleType(vehicleType)) {
      errorMsg = `Vehicle type not found (or) ${vehicleType} is not a valid type`;
      return res.status(400).json({ data: [], error: errorMsg });
    } else if (!make || !model) {
      errorMsg = `Vehicle make / model not found (or) ${make} / ${model} is not a valid make/model`;
      return res.status(400).json({ data: [], error: errorMsg });
    }

    const yearlyMakeModelConsumptionQuery =
      buildAvgYearlyConsumptionForMakeAndModelQuery(make, model, vehicleType);

    const { query, close } = await connect();

    try {
      const dbResponse = await query(yearlyMakeModelConsumptionQuery);

      console.log(
        `Retrieved ${dbResponse.rows.length} rows of yearly fuel consumption values 
        for make: ${make} model: ${model} and vehicle_type: ${vehicleType}`,
      );

      const normalizedConsumptionValues = convertToBTUs(
        dbResponse.rows,
        miles,
        vehicleType,
      );

      const data = normalizedConsumptionValues.map((row) => {
        return {
          year: row.year,
          consumption: row.consumption,
        };
      });

      return res.status(200).json({ data, error: "" });
    } catch (error) {
      console.log(
        `Error while retrieving yearly emissions for make: ${make}, model: ${model} 
        and vehicle_type ${vehicleType} - ${error}`,
      );

      errorMsg = `Unexpected error occurred while retrieving yearly emissions for make: 
        ${make}, model: ${model} and vehicle_type ${vehicleType}`;

      return res.status(500).json({ data: [], error: errorMsg });
    } finally {
      await close();
    }
  },
);

export default fuelConsumptionRouter;
