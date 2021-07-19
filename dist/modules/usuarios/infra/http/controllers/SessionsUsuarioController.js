"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AuthenticateUsuarioService = _interopRequireDefault(require("../../../services/AuthenticateUsuarioService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SessionsUsuarioController {
  async create(request, response) {
    const {
      login,
      senha
    } = request.body;

    const authenticateUsuarioService = _tsyringe.container.resolve(_AuthenticateUsuarioService.default);

    const {
      token
    } = await authenticateUsuarioService.execute({
      login,
      senha
    });
    return response.json({
      token
    });
  }

}

exports.default = SessionsUsuarioController;