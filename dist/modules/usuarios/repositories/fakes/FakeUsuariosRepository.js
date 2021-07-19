"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Usuario = _interopRequireDefault(require("../../infra/typeorm/entities/Usuario"));

var _uuid = require("uuid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FakeUsuariosRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = [];
  }

  async create({
    ativo,
    login,
    senha
  }) {
    const usuario = new _Usuario.default();
    Object.assign(usuario, {
      id: (0, _uuid.v4)(),
      ativo,
      login,
      senha
    });
    this.ormRepository.push(usuario);
    return usuario;
  }

  async allActive() {
    const usuarios = await this.ormRepository.filter(usuario => usuario.ativo === true);
    return usuarios;
  }

  async all() {
    return this.ormRepository;
  }

  async findById(id) {
    return this.ormRepository.find(usuario => usuario.id === id);
  }

  async findByLogin(login) {
    return this.ormRepository.find(usuario => usuario.login === login);
  }

  async save(data) {
    const indexUsuario = this.ormRepository.findIndex(usuario => usuario.id === data.id);
    this.ormRepository[indexUsuario] = data;
    return data;
  }

}

var _default = FakeUsuariosRepository;
exports.default = _default;