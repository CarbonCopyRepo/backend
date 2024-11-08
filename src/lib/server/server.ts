// This file contains methods and utilities for express server setup and configuration.
// INFO: All express app related configuration should be added here
//      (i.e.) CORS, middlewares, routes etc.

import express, { Express, Request, Response } from "express";
import cors from "cors";

import apiRouter from "../../routes";
import userRouter from "../../user/routes";
import csRouter from "../../charging-stations/routes";
import storageRouter from "../../storage/routes";
import emissionsRouter from "../../emissions/routes";
import seedDataRouter from "../../seed-data/routes";
import vehiclesRouter from "../../vehicles/routes";
import fuelConsumptionRouter from "../../fuel-consumption/routes";

// Singleton that stores the express server instance that
// can be used throughout the entire application
let app: Express;

export const getExpressServerInstance = (): Express => {
  if (!app) {
    app = express();

    const corsConfig = { origin: "*" };

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors(corsConfig));

    // Initialize the individual routers as per component
    apiRouter.use("/users", userRouter);
    apiRouter.use("/storage", storageRouter);
    apiRouter.use("/stations", csRouter);
    apiRouter.use("/seedData", seedDataRouter);
    apiRouter.use("/emissions", emissionsRouter);
    apiRouter.use("/vehicles", vehiclesRouter);
    apiRouter.use("/consumption", fuelConsumptionRouter);

    // Make all routes available under the root /api prefix
    app.use("/api", apiRouter);
    app.use("/api", csRouter);
    app.use("/api", seedDataRouter);
    app.use("/api", emissionsRouter);
    app.use("/api", vehiclesRouter);
    app.use("/api", fuelConsumptionRouter);

    // Redirect to "/api", if the app gets a request on "/"
    app.get("/", (req: Request, res: Response) => {
      res.redirect("/api");
    });
  }

  return app;
};
