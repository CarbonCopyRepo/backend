// The main entry point of the backend part of our CarbonCopy app
import express, { Express, Request, Response } from "express";
import dotenv  from "dotenv";

// Load our environment variables from .env
// file using the dotenv npm package
dotenv.config();

const app:Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res:Response) => {
    res.send('Hello from Carbon Copy Backend Server!');
});

app.listen(port, () => {
    console.log(`[carboncopy]: Making the globe carbon emission aware at port:${port} since 2024 :)`);
})