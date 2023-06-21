"use strict";

var path = require('path');

var env = require('dotenv');

env.config(path.join(__dirname, '..', '.env'));
var appPort = process.env.PORT;
var mongoUser = process.env.MONGO_USER;
var mongoPass = process.env.MONGO_PASS;
module.exports = {
  appPort: appPort,
  mongoUser: mongoUser,
  mongoPass: mongoPass
};