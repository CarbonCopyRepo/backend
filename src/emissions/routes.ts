import { Request, Response, Router } from "express";
import { connect } from "../lib/db/db";

const emissionsRouter = Router();

emissionsRouter.get("/", async (req: Request, res: Response) => {
  const { query, close } = await connect();

  try {
    const dbResponse = await query("SELECT NOW()");
    console.log(dbResponse.rows);
  } catch (err) {
    console.log(`Error in query execution: ${err}`);
  } finally {
    await close();
  }

  return res.status(200).json({ message: "Hello from emissions router!" });
});

export default emissionsRouter;
