// This file contains methods and utilities for express server setup and configuration.
// INFO: All express app related configuration should be added here
//      (i.e.) CORS, middlewares, routes etc.

import express, { Express, Request, Response } from "express";

import userRouter from "../../user/routes";
import apiRouter from "../../routes";

// Singleton that stores the express server instance that
// can be used throughout the entire application
let app: Express;

export const getExpressServerInstance = (): Express => {
  if (!app) {
    app = express();

    // Initialize the individual routers as per component
    apiRouter.use("/users", userRouter);

    // Make all routes available under the root /api prefix
    app.use("/api", apiRouter);

    // Redirect to "/api", if the app gets a request on "/"
    app.get("/", (req: Request, res: Response) => {
      res.redirect("/api");
    });
  }

  return app;
};
