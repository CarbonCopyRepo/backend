import {
  getAllVehiclesData,
  prepareMakeTableData,
  processAllVehiclesModelData,
} from "./formatter";

import {
  buildSeedMakeTableQuery,
  buildSeedModelTableQuery,
} from "./queries/seed.queries";

import { connect } from "../../db/db";

export const seedMakeTable = async () => {
  const allVehiclesData = await getAllVehiclesData();
  const makeTableData = prepareMakeTableData(allVehiclesData);
  const makeTableDataStr = JSON.stringify(makeTableData);

  // console.log(makeTableData.length);

  const queryStr = buildSeedMakeTableQuery(makeTableDataStr);
  // console.log(queryStr);

  const { query, close } = await connect();

  try {
    await query(queryStr);
    console.log(
      `${makeTableData.length} unique car makes inserted successfully`,
    );
  } catch (error) {
    console.log(`Error while inserting unique car makes: ${error}`);
  } finally {
    await close();
  }
};

export const seedModelTable = async () => {
  const allVehiclesData = await getAllVehiclesData();
  // console.log(allVehiclesData.length);

  const formattedVehiclesData = processAllVehiclesModelData(allVehiclesData);

  // console.log(formattedVehiclesData.length);

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
