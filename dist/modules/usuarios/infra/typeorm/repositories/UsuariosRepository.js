"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Usuario = _interopRequireDefault(require("../entities/Usuario"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UsuariosRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Usuario.default);
  }

  async create(data) {
    const Usuario = this.ormRepository.create(data);
    await this.ormRepository.save(Usuario);
    return Usuario;
  }

  async allActive() {
    const Usuarios = await this.ormRepository.find({
      ativo: true
    });
    return Usuarios;
  }

  async all() {
    const Usuarios = await this.ormRepository.find();
    return Usuarios;
  }

  async findById(id) {
    const Usuario = await this.ormRepository.findOne({
      where: {
        id
      }
    });
    return Usuario;
  }

  async findByLogin(login) {
    const Usuario = await this.ormRepository.findOne({
      where: {
        login
      }
    });
    return Usuario;
  }

  async save(Usuario) {
    return this.ormRepository.save(Usuario);
  }

}

var _default = UsuariosRepository;
exports.default = _default;