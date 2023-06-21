"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('../config/config'),
    mongoUser = _require.mongoUser,
    mongoPass = _require.mongoPass;

var _require2 = require('mongodb'),
    MongoClient = _require2.MongoClient,
    ServerApiVersion = _require2.ServerApiVersion;

var _require3 = require('../utils/validation'),
    isPersianWithoutNumber = _require3.isPersianWithoutNumber,
    isNumber = _require3.isNumber,
    correctCharacters = _require3.correctCharacters,
    isEmail = _require3.isEmail;

var uri = "mongodb+srv://".concat(mongoUser, ":").concat(mongoPass, "@cluster0.bitnoqv.mongodb.net/?retryWrites=true&w=majority");

var Controller =
/*#__PURE__*/
function () {
  function Controller() {
    _classCallCheck(this, Controller);
  }

  _createClass(Controller, null, [{
    key: "get",
    value: function get(req, res) {
      var client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverApi: ServerApiVersion.v1
      });
      client.connect(function _callee(err) {
        var collection, _req$query, user, offset, query, count;

        return regeneratorRuntime.async(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (err) console.log(err);
                collection = client.db("setude").collection("users");
                _req$query = req.query, user = _req$query.user, offset = _req$query.offset;
                query = user ? {
                  fullName: new RegExp(user)
                } : {};
                _context.next = 6;
                return regeneratorRuntime.awrap(collection.countDocuments(query));

              case 6:
                count = _context.sent;
                collection.find(query).skip((parseInt(offset) - 1) * 4).limit(5).toArray(function (err, result) {
                  if (err) console.log(err);else {
                    client.close();
                    res.send({
                      users: result,
                      count: count
                    });
                  }
                });

              case 8:
              case "end":
                return _context.stop();
            }
          }
        });
      });
    }
  }, {
    key: "post",
    value: function post(req, res) {
      var _req$body = req.body,
          fullName = _req$body.fullName,
          studentNumber = _req$body.studentNumber,
          email = _req$body.email,
          address = _req$body.address;
      var client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverApi: ServerApiVersion.v1
      });

      if (!fullName.trim() || !studentNumber.trim() || !email.trim() || !address.trim()) {
        return res.status(400).send({
          error: true,
          message: "همه مقادیر را وارد نمایید"
        });
      }

      if (!isPersianWithoutNumber(correctCharacters(fullName))) {
        return res.status(400).send({
          error: true,
          message: "نام نامعتبر"
        });
      }

      if (!isNumber(correctCharacters(studentNumber))) {
        return res.status(400).send({
          error: true,
          message: "شماره دانشجویی نامعتبر"
        });
      }

      if (!isEmail(correctCharacters(email))) {
        return res.status(400).send({
          error: true,
          message: "ایمیل نامعتبر"
        });
      } // if (!isPersianWithsymbol(correctCharacters(address))) {
      //   return res.status(400).send({ error: true, message: "آدرس نامعتبر" });
      // }


      client.connect(function _callee2(err) {
        var collection;
        return regeneratorRuntime.async(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (err) console.log(err);
                collection = client.db("setude").collection("users");
                collection.insertOne(req.body, function (err, result) {
                  if (err) console.log(err);
                  client.close();
                  res.send({
                    success: true
                  });
                });

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        });
      });
    }
  }]);

  return Controller;
}();

module.exports = Controller;