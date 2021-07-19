"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _UsuarioController = _interopRequireDefault(require("../controllers/UsuarioController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const usuariosRouter = (0, _express.Router)();
const usuarioController = new _UsuarioController.default();
usuariosRouter.post("/", usuarioController.create);
var _default = usuariosRouter;
exports.default = _default;