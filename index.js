// file name => index
require("winston-mongodb");
const winston = require("winston");
require("express-async-errors");
const error = require("./routes/middleware/error");
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const users = require('./routes/users');
const auth = require("./routes/auth");
const tasks = require("./routes/tasks");
const express = require('express');
const app = express();
require("dotenv").config();

process.on("uncaughtException", (ex) => {
  console.log("WE GOT AN UNCAUGHT EXCEPTION");
  winston.error(ex.message, ex);
});

winston.add(winston.transports.File, { filename: "logfile.log" });
winston.add(winston.transports.MongoDB, { db: "mongodb://localhost/vidly", level: "info" });

throw new Error("Somwthing failed during startup");

if (!process.env.jwtPrivateKey) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
};
let port = process.env.PORT;
let host = process.env.HOST;

mongoose.connect(`mongodb://${host}/vidly`)
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/users', users);
app.use("/api/auth", auth);
app.use("/api/tasks", tasks);

app.use(error)

app.listen(port, host, () => {
  console.log(`Server is listening ${host}:${port}`);
});