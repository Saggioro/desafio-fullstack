"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateUsuarioService = _interopRequireDefault(require("../../../services/CreateUsuarioService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UsuarioController {
  async create(request, response) {
    const {
      login,
      senha,
      ativo
    } = request.body;

    const createUsuarioService = _tsyringe.container.resolve(_CreateUsuarioService.default);

    await createUsuarioService.execute({
      login,
      senha,
      ativo
    });
    return response.status(201).send();
  }

}

exports.default = UsuarioController;