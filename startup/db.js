const winston = require("winston");
const mongoose = require('mongoose');

let host = process.env.HOST;

module.exports = function () {
    mongoose.connect(`mongodb://${host}/vidly`)
        .then(() => winston.info('Connected to MongoDB...'))
}