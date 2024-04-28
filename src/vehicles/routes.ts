import { Router, Request, Response } from "express";
import {
  buildCarMakesForVehicleTypeQuery,
  buildCarModelsForMakeAndVehicleTypeQuery,
} from "./queries/vehicles.queries";
import { connect } from "../lib/db/db";
import { isValidVehicleType } from "./vehicles.utils";

const vehiclesRouter = Router();

vehiclesRouter.get("/makes", async (req: Request, res: Response) => {
  const vehicleType = (req?.query?.vehicleType || null) as string;

  let errorMsg = "";

  if (!isValidVehicleType(vehicleType as string)) {
    errorMsg = `Vehicle type not found (or) ${vehicleType} is not a valid type`;
    return res.status(400).json({ data: [], error: errorMsg });
  }

  const carMakesQuery = buildCarMakesForVehicleTypeQuery(vehicleType as string);
  // console.log(carMakesQuery);

  const { query, close } = await connect();

  try {
    const dbResponse = await query(carMakesQuery);
    console.log(
      `Retrieved ${dbResponse.rows.length} car makes for vehicle_type: ${vehicleType}`,
    );

    const data = dbResponse.rows.map((row) => {
      return {
        make: row.car_make,
      };
    });

    return res.status(200).json({ data, error: "" });
  } catch (error) {
    console.log(
      `Error while retrieving car makes for vehicle_type ${vehicleType} - ${error}`,
    );

    errorMsg = `Unexpected error occurred while retrieving car makes for vehicle_type ${vehicleType}`;

    return res.status(500).json({ data: [], error: errorMsg });
  } finally {
    await close();
  }
});

vehiclesRouter.get("/models", async (req: Request, res: Response) => {
  const make = (req?.query?.make || null) as string;
  const vehicleType = (req?.query?.vehicleType || null) as string;

  let errorMsg = "";

  if (!make) {
    errorMsg = `Make for vehicle is not found - ${make}`;
    return res.status(400).json({ data: [], error: errorMsg });
  } else if (!isValidVehicleType(vehicleType)) {
    errorMsg = `Vehicle type not found (or) ${vehicleType} is not a valid type`;
    return res.status(400).json({ data: [], error: errorMsg });
  }

  const carModelsQuery = buildCarModelsForMakeAndVehicleTypeQuery(
    make as string,
    vehicleType,
  );

  const { query, close } = await connect();

  try {
    const dbResponse = await query(carModelsQuery);

    console.log(
      `Retrieved ${dbResponse.rows.length} car models for make: ${make} and vehicle_type: ${vehicleType}`,
    );

    const data = dbResponse.rows.map((row) => {
      return {
        model: row.model,
      };
    });

    return res.status(200).json({ data, error: "" });
  } catch (error) {
    console.log(
      `Error while retrieving car models for make ${make} and vehicle_type ${vehicleType} - ${error}`,
    );

    errorMsg = `Unexpected error occurred while retrieving car models for make ${make} and vehicle_type ${vehicleType}`;

    return res.status(500).json({ data: [], error: errorMsg });
  } finally {
    await close();
  }
});

export default vehiclesRouter;
