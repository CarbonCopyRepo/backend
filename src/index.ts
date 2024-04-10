// The main entry point of the backend part of our CarbonCopy app
// TODO: Resolve path aliases (i.e. "@/") during docker build
import dotenv from "dotenv";
import { getExpressServerInstance } from "./lib/server/server";
import express from "express";

// Load our environment variables from .env
// file using the dotenv npm package
dotenv.config();

const app = getExpressServerInstance();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(
    `[carboncopy]: Making the globe carbon emission aware at port:${port} since 2024 :)`,
  );
});
