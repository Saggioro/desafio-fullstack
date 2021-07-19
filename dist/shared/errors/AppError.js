"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class Error {
  constructor(messages, statusCode = 400) {
    this.messages = void 0;
    this.statusCode = void 0;
    this.messages = messages;
    this.statusCode = statusCode;
  }

}

var _default = Error;
exports.default = _default;