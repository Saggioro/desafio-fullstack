"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Pessoa = _interopRequireDefault(require("../../infra/typeorm/entities/Pessoa"));

var _uuid = require("uuid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FakePessoasRepository {
  constructor() {
    this.repository = void 0;
    this.repository = [];
  }

  async create({
    cpf,
    nacionalidade,
    naturalidade,
    nome,
    sexo,
    email,
    nascimento
  }) {
    const pessoa = new _Pessoa.default();
    Object.assign(pessoa, {
      id: (0, _uuid.v4)(),
      cpf,
      nacionalidade,
      naturalidade,
      nome,
      sexo,
      email,
      nascimento
    });
    await this.repository.push(pessoa);
    return pessoa;
  }

  async all() {
    const pessoas = this.repository;
    return pessoas;
  }

  async findById(id) {
    const pessoa = await this.repository.find(pessoa => pessoa.id === id);
    return pessoa;
  }

  async findByCpf(cpf) {
    const pessoa = await this.repository.find(pessoa => pessoa.cpf === cpf);
    return pessoa;
  }

  async findByEmail(email) {
    const pessoa = await this.repository.find(pessoa => pessoa.email === email);
    return pessoa;
  }

  async save(data) {
    const indexPessoa = await this.repository.findIndex(pessoa => data.id === pessoa.id);
    this.repository[indexPessoa] = data;
    return data;
  }

  async delete(data) {
    const indexPessoa = this.repository.findIndex(pessoa => pessoa.id === data.id);
    this.repository.splice(indexPessoa, 1);
  }

}

var _default = FakePessoasRepository;
exports.default = _default;