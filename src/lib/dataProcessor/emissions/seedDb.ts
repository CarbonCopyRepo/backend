import { processGasolineData } from "./gasoline";
import { processEVData } from "./ev";
import { getUniqueMakes } from "./formatter";
import { buildSeedMakeTableQuery } from "./queries/seed.queries";
import { connect } from "../../db/db";

export const seedMakeTable = async () => {
  const gasVehiclesData = await processGasolineData();
  const evVehiclesData = await processEVData();

  const allVehiclesData = [...gasVehiclesData, ...evVehiclesData];

  const allUniqueMakes = getUniqueMakes(allVehiclesData);

  const allUniqueMakesStr = JSON.stringify(allUniqueMakes);

  const queryStr = buildSeedMakeTableQuery(allUniqueMakesStr);
  console.log(queryStr);

  const { query, close } = await connect();

  try {
    const dbRes = await query(queryStr);

    console.log(
      `${allUniqueMakes.length} unique car makes inserted successfully`,
    );

    console.log(`${dbRes.rows.length}`);
  } catch (error) {
    console.log(`Error while inserting unique car makes: ${error}`);
  } finally {
    await close();
  }
};
