"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  jwt: {
    secret: process.env.APP_SECRET || "5e4c0cc6ff56b01f91f432052cc96b8b",
    expiresIn: "1d"
  }
};
exports.default = _default;