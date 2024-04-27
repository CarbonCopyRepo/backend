import {
  getAllVehiclesData,
  getUniqueMakes,
  processAllVehiclesMakeData,
} from "./formatter";

import {
  buildSeedMakeTableQuery,
  buildSeedModelTableQuery,
} from "./queries/seed.queries";

import { connect } from "../../db/db";

export const seedMakeTable = async () => {
  const allVehiclesData = await getAllVehiclesData();
  const allUniqueMakes = getUniqueMakes(allVehiclesData);
  const allUniqueMakesStr = JSON.stringify(allUniqueMakes);

  const queryStr = buildSeedMakeTableQuery(allUniqueMakesStr);
  // console.log(queryStr);

  const { query, close } = await connect();

  try {
    await query(queryStr);
    console.log(
      `${allUniqueMakes.length} unique car makes inserted successfully`,
    );
  } catch (error) {
    console.log(`Error while inserting unique car makes: ${error}`);
  } finally {
    await close();
  }
};

export const seedModelTable = async () => {
  const allVehiclesData = await getAllVehiclesData();

  const formattedVehiclesData = processAllVehiclesMakeData(allVehiclesData);

  const jsonDataStr = JSON.stringify(formattedVehiclesData);

  const queryStr = buildSeedModelTableQuery(jsonDataStr);
  // console.log(queryStr);

  const { query, close } = await connect();

  try {
    await query(queryStr);
    console.log(
      `${formattedVehiclesData.length} car model details inserted successfully`,
    );
  } catch (error) {
    console.log(`Error while inserting car model details : ${error}`);
  } finally {
    await close();
  }
};
