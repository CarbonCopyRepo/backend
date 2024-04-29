import { Request, Response, Router } from "express";

import { isValidVehicleType } from "../vehicles/vehicles.utils";

import {
  buildAverageEmissionsForMakeAndModelYearlyQuery,
  buildAverageEmissionsYearlyQuery,
} from "./queries/emissions.queries";

import { connect } from "../lib/db/db";

const emissionsRouter = Router();

emissionsRouter.get("/yearly", async (req: Request, res: Response) => {
  const vehicleType = (req?.query?.vehicleType || null) as string;
  const miles = parseInt(req?.query?.miles as string) || 50;

  let errorMsg = "";

  if (!isValidVehicleType(vehicleType)) {
    errorMsg = `Vehicle type not found (or) ${vehicleType} is not a valid type`;
    return res.status(400).json({ data: [], error: errorMsg });
  }

  const yearlyEmissionsQuery = buildAverageEmissionsYearlyQuery(
    vehicleType as string,
  );

  // console.log(yearlyEmissionsQuery);

  const { query, close } = await connect();

  try {
    const dbResponse = await query(yearlyEmissionsQuery);

    console.log(
      `Retrieved ${dbResponse.rows.length} rows of yearly emission values for vehicle_type: ${vehicleType}`,
    );

    const data = dbResponse.rows.map((row) => {
      return {
        year: row.year,
        emissions: row.avg_emission_in_grams * miles,
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

emissionsRouter.get("/yearlyByMake", async (req: Request, res: Response) => {
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

  const yearlyMakeModelEmissionsQuery =
    buildAverageEmissionsForMakeAndModelYearlyQuery(make, model, vehicleType);

  // console.log(yearlyMakeModelEmissionsQuery);

  const { query, close } = await connect();

  try {
    const dbResponse = await query(yearlyMakeModelEmissionsQuery);

    console.log(
      `Retrieved ${dbResponse.rows.length} avg yearly emission records for make: 
        ${make}, model: ${model}, vehicle type: ${vehicleType}`,
    );

    const data = dbResponse.rows.map((row) => {
      return {
        year: row.year,
        emissions: row.avg_emission_in_grams * miles,
      };
    });

    return res.status(200).json({ data, error: "" });
  } catch (error) {
    console.log(
      `Error while retrieving avg yearly emission records for make: 
        ${make}, model: ${model}, vehicle type: ${vehicleType} - ${error}`,
    );

    errorMsg = `Unexpected error occurred while retrieving avg yearly emission 
      records for make: ${make}, model: ${model}, vehicle type: ${vehicleType}`;

    return res.status(500).json({ data: [], error: errorMsg });
  } finally {
    await close();
  }
});

export default emissionsRouter;
