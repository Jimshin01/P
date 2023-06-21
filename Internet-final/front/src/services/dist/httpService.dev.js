"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showErrorMessage = exports.getErrorType = exports.http = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _config = _interopRequireDefault(require("./config.json"));

var _messages = require("../utils/messages");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var http = _axios["default"].create({
  baseURL: _config["default"].baseURL
});

exports.http = http;
http.defaults.headers.post["Content-Type"] = "application/json";

_axios["default"].interceptors.response.use(null, function (error) {
  var expectedErrors = error.response && error.response.status >= 400 && error.response.status < 500;
  !expectedErrors && (0, _messages.errorMessage)("مشکلی از سمت سرور رخ داده");
  return Promise.reject(error);
});

var getErrorType = function getErrorType(error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    return {
      error: true,
      errorType: "response",
      errorBody: error.response
    };
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    return {
      error: true,
      errorType: "request",
      errorBody: error.request
    };
  } else {
    // Something happened in setting up the request that triggered an Error
    return {
      error: true,
      errorBody: error.message
    };
  }
};

exports.getErrorType = getErrorType;

var showErrorMessage = function showErrorMessage(result) {
  switch (result.errorType) {
    case "request":
      (0, _messages.errorMessage)("دسترسی به اینترنت را چک کنید");
      break;

    case "response":
      result.errorBody.data.message ? (0, _messages.errorMessage)(result.errorBody.data.message) : (0, _messages.errorMessage)(result.errorBody.data);
      break;

    default:
      (0, _messages.errorMessage)(result.errorBody);
      break;
  }
};

exports.showErrorMessage = showErrorMessage;