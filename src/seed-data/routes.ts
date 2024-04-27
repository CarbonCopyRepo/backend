import { Request, Response, Router } from "express";

import {
  seedMakeTable,
  seedModelTable,
} from "../lib/dataProcessor/emissions/seedDb";

const seedDataRouter = Router();

seedDataRouter.get("/check", async (req: Request, res: Response) => {
  const db = process.env.DB_NAME;

  return res
    .status(200)
    .json({ message: `From health check seed data router - ${db}` });
});

// INFO: Do not execute this!! Table is already seeded
seedDataRouter.get("/makeTable", async (req: Request, res: Response) => {
  try {
    await seedMakeTable();
  } catch (error) {
    console.log(error);
  }

  return res.status(200).json({ message: "Hello from seed make table route!" });
});

// INFO: Do not execute this!! Table is already seeded
seedDataRouter.get("/modelTable", async (req: Request, res: Response) => {
  try {
    await seedModelTable();
  } catch (error) {
    console.log(error);
  }

  return res
    .status(200)
    .json({ message: "Hello from seed model table route!" });
});

export default seedDataRouter;
