// file name => index
// for test extention git lens
const express = require('express');
const winston = require("winston");
const app = express();

require("./startup/config")();
require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();

// 0 means success diffrent mean failear

let port = process.env.PORT;
let host = process.env.HOST;

app.listen(port, host, () => {
  winston.info(`Server is listening ${host}:${port}`);
});