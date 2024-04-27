import { Request, Response, Router } from "express";

import {
  seedMakeTable,
  seedModelTable,
} from "../lib/dataProcessor/emissions/seedDb";

const emissionsRouter = Router();

// INFO: Do not execute this!! Table is already seeded
emissionsRouter.get("/seedMakeTable", async (req: Request, res: Response) => {
  try {
    await seedMakeTable();
  } catch (error) {
    console.log(error);
  }

  return res.status(200).json({ message: "Hello from seed make table route!" });
});

emissionsRouter.get("/seedModelTable", async (req: Request, res: Response) => {
  try {
    await seedModelTable();
  } catch (error) {
    console.log(error);
  }

  return res
    .status(200)
    .json({ message: "Hello from seed model table route!" });
});

export default emissionsRouter;
