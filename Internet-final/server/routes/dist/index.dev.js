"use strict";

var _require = require('express'),
    Router = _require.Router;

var controller = require('../controllers/controller');

var router = Router();

module.exports = function () {
  router.route('/users').get(controller.get).post(controller.post);
  return router;
};