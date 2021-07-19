"use strict";

var _PessoasRepository = _interopRequireDefault(require("../../modules/pessoas/infra/typeorm/repositories/PessoasRepository"));

var _UsuariosRepository = _interopRequireDefault(require("../../modules/usuarios/infra/typeorm/repositories/UsuariosRepository"));

var _tsyringe = require("tsyringe");

require("./providers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tsyringe.container.registerSingleton("UsuariosRepository", _UsuariosRepository.default);

_tsyringe.container.registerSingleton("PessoasRepository", _PessoasRepository.default);