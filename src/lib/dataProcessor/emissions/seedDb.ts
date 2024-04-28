import {
  formatVehiclesData,
  prepareMakeTableData,
  processAllVehiclesModelData,
} from "./formatter";

import {
  buildSeedMakeTableQuery,
  buildSeedModelTableQuery,
} from "./queries/seed.queries";

import { connect } from "../../db/db";
import { processGasolineData } from "./gasoline";
import { processEVData } from "./ev";

export const seedMakeTable = async () => {
  const gasVehiclesData = await processGasolineData();
  const evVehiclesData = await processEVData();

  const processedGasVehiclesData = formatVehiclesData(gasVehiclesData);
  const processedEVVehiclesData = formatVehiclesData(evVehiclesData);

  const gasMakes = prepareMakeTableData(processedGasVehiclesData);
  const evMakes = prepareMakeTableData(processedEVVehiclesData);

  const allMakes = [...gasMakes, ...evMakes];
  const allMakesStr = JSON.stringify(allMakes);

  const queryStr = buildSeedMakeTableQuery(allMakesStr);
  // console.log(queryStr);

  const { query, close } = await connect();

  try {
    await query(queryStr);
    console.log(`${allMakes.length} unique car makes inserted successfully`);
  } catch (error) {
    console.log(`Error while inserting unique car makes: ${error}`);
  } finally {
    await close();
  }
};

export const seedModelTable = async () => {
  const gasVehicles = await processGasolineData();
  const evVehicles = await processEVData();

  const processedGasVehiclesData = formatVehiclesData(gasVehicles);
  const processedEVVehiclesData = formatVehiclesData(evVehicles);

  const gasModelsInfo = processAllVehiclesModelData(processedGasVehiclesData);
  const evModelsInfo = processAllVehiclesModelData(processedEVVehiclesData);

  const formattedVehiclesData = [...gasModelsInfo, ...evModelsInfo];
  console.log(formattedVehiclesData.length);

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
