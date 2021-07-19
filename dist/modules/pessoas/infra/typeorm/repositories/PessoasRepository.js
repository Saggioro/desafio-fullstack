"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Pessoa = _interopRequireDefault(require("../entities/Pessoa"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PessoasRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Pessoa.default);
  }

  async create(data) {
    const pessoa = this.ormRepository.create(data);
    await this.ormRepository.save(pessoa);
    return pessoa;
  }

  async all() {
    const pessoas = await this.ormRepository.find();
    return pessoas;
  }

  async findById(id) {
    const pessoa = await this.ormRepository.findOne({
      where: {
        id
      }
    });
    return pessoa;
  }

  async findByCpf(cpf) {
    const pessoa = await this.ormRepository.findOne({
      where: {
        cpf
      }
    });
    return pessoa;
  }

  async findByEmail(email) {
    const pessoa = await this.ormRepository.findOne({
      where: {
        email
      }
    });
    return pessoa;
  }

  async save(pessoa) {
    return this.ormRepository.save(pessoa);
  }

  async delete(pessoa) {
    await this.ormRepository.remove(pessoa);
  }

}

var _default = PessoasRepository;
exports.default = _default;