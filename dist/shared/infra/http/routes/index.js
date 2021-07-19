"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pessoas = _interopRequireDefault(require("../../../../modules/pessoas/infra/http/routes/pessoas.routes"));

var _sessionsUsuario = _interopRequireDefault(require("../../../../modules/usuarios/infra/http/routes/sessionsUsuario.routes"));

var _usuarios = _interopRequireDefault(require("../../../../modules/usuarios/infra/http/routes/usuarios.routes"));

var _express = require("express");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)();
routes.use("/sessionsUsuario", _sessionsUsuario.default);
routes.use("/usuarios", _usuarios.default);
routes.use("/pessoas", _pessoas.default);
routes.get("/", (request, response) => {
  return response.json({
    message: "OK!"
  });
});
var _default = routes;
exports.default = _default;