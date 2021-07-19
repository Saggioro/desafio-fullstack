"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _default = async () => {
  return (0, _typeorm.createConnection)();
};

exports.default = _default;