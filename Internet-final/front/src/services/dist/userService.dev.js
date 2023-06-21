"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addUserService = exports.getUsersService = void 0;

var _httpService = require("../services/httpService");

var getUsersService = function getUsersService() {
  var q,
      offset,
      _args = arguments;
  return regeneratorRuntime.async(function getUsersService$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          q = _args.length > 0 && _args[0] !== undefined ? _args[0] : "";
          offset = _args.length > 1 && _args[1] !== undefined ? _args[1] : 1;
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(_httpService.http.get("users", {
            params: {
              user: q,
              offset: offset
            }
          }));

        case 5:
          return _context.abrupt("return", _context.sent);

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](2);
          return _context.abrupt("return", (0, _httpService.getErrorType)(_context.t0));

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 8]]);
};

exports.getUsersService = getUsersService;

var addUserService = function addUserService(data) {
  return regeneratorRuntime.async(function addUserService$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_httpService.http.post("users", data));

        case 3:
          return _context2.abrupt("return", _context2.sent);

        case 6:
          _context2.prev = 6;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", (0, _httpService.getErrorType)(_context2.t0));

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 6]]);
};

exports.addUserService = addUserService;