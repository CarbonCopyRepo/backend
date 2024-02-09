// The main entry point of the backend part of our CarbonCopy app
const express = require('express');
const dotenv = require('dotenv');

// Load our environment variables from .env
// file using the dotenv npm package
dotenv.config();

const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => {
    res.send('Hello from Carbon Copy Backend Server!');
});

app.listen(port, () => {
    console.log(`[carboncopy]: Making the globe carbon emission aware at port:${port} since 2024 :)`);
})