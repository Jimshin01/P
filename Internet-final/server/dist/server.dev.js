"use strict";

var express = require('express');

var cors = require('cors');

var router = require('./routes');

var _require = require('./config/config'),
    appPort = _require.appPort;

var _require2 = require('./utils/static'),
    statics = _require2.statics;

var app = express(); // cors
// app.use(cors({
//   origin: [`localhost:${appPort}`],
//   credentials: true
// }))

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
}); // req encode

app.use(express.json());
app.use(express.urlencoded({
  extended: false
})); // statics

statics(app); // router

app.use('/', router());
app.listen(appPort, function () {
  return console.log('\x1b[32m', "-----------  Server running : ".concat(appPort, "  -----------"), '\x1b[0m');
});