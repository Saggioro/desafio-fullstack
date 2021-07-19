"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _SessionsUsuarioController = _interopRequireDefault(require("../controllers/SessionsUsuarioController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const sessionsUsuarioRouter = (0, _express.Router)();
const sessionsUsuarioController = new _SessionsUsuarioController.default();
sessionsUsuarioRouter.post("/", sessionsUsuarioController.create);
var _default = sessionsUsuarioRouter;
exports.default = _default;