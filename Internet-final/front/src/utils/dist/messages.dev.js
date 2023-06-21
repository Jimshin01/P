"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorMessage = exports.successMessage = void 0;

var _reactToastify = require("react-toastify");

var successMessage = function successMessage(message) {
  _reactToastify.toast.success(message, {
    position: "top-right",
    closeOnClick: true
  });
};

exports.successMessage = successMessage;

var errorMessage = function errorMessage(message) {
  _reactToastify.toast.error(message, {
    position: "top-right",
    closeOnClick: true
  });
};

exports.errorMessage = errorMessage;