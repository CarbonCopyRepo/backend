import { Router, Request, Response } from "express";
import { connect } from "../lib/db/db";

import { isValidVehicleType } from "../vehicles/vehicles.utils";
import { convertToBTUs } from "./fuel-consumption.utils";

import { buildAvgYearlyConsumptionQuery } from "./queries/fuel-consumption.queries";

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

export default fuelConsumptionRouter;
