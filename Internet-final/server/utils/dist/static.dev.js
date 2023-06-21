"use strict";

var path = require('path');

var express = require('express');

module.exports.statics = function (app) {
  app.use(express["static"](path.join(__dirname, '..', 'public')));
};