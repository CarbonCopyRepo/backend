import { Router, Request, Response } from "express";
import { VEHICLE_TYPES } from "../lib/constants";
import { buildCarMakesForVehicleTypeQuery } from "./queries/vehicles.queries";
import { connect } from "../lib/db/db";

const vehiclesRouter = Router();

vehiclesRouter.get("/makes", async (req: Request, res: Response) => {
  const vehicleType = (req?.query?.vehicleType || null) as string;

  let errorMsg = "";

  if (
    !vehicleType ||
    !Object.values(VEHICLE_TYPES).includes(vehicleType as string)
  ) {
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

export default vehiclesRouter;
