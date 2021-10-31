// file name => index
require("winston-mongodb");
const winston = require("winston");
require("express-async-errors");
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const express = require('express');
const app = express();
require("./startup/routes")(app);
require("./startup/db")();
require("dotenv").config();

// 0 means success diffrent mean failear

winston.handleExceptions(
  new winston.transports.File({ filename: "uncaughtExceptions.log" })
)

process.on("unhandledRejection", (ex) => {
  throw ex;
});

winston.add(winston.transports.File, { filename: "logfile.log" });
winston.add(winston.transports.MongoDB, { db: "mongodb://localhost/vidly", level: "info" });

const p = Promise.reject(new Error("Something failed miserably!"));
p.then(() => console.log("Done"));

if (!process.env.jwtPrivateKey) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
};
let port = process.env.PORT;
let host = process.env.HOST;

app.listen(port, host, () => {
  console.log(`Server is listening ${host}:${port}`);
});