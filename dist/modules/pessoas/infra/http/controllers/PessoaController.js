"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _DeletePessoaService = _interopRequireDefault(require("../../../services/DeletePessoaService"));

var _GetAllPessoasService = _interopRequireDefault(require("../../../services/GetAllPessoasService"));

var _GetPessoaByIdService = _interopRequireDefault(require("../../../services/GetPessoaByIdService"));

var _UpdatePessoaService = _interopRequireDefault(require("../../../services/UpdatePessoaService"));

var _tsyringe = require("tsyringe");

var _CreatePessoaService = _interopRequireDefault(require("../../../services/CreatePessoaService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PessoaController {
  async create(request, response) {
    const {
      nascimento,
      naturalidade,
      nome,
      sexo,
      nacionalidade,
      email,
      cpf,
      endereco
    } = request.body;

    const createPessoaService = _tsyringe.container.resolve(_CreatePessoaService.default);

    const pessoa = await createPessoaService.execute({
      nascimento,
      naturalidade,
      nome,
      sexo,
      nacionalidade,
      email,
      cpf,
      endereco
    });
    return response.status(201).json(pessoa);
  }

  async update(request, response) {
    const data = request.body;

    const updatePessoaService = _tsyringe.container.resolve(_UpdatePessoaService.default);

    const pessoa = await updatePessoaService.execute(data);
    return response.json(pessoa);
  }

  async delete(request, response) {
    const {
      id
    } = request.params;

    const deletePessoaService = _tsyringe.container.resolve(_DeletePessoaService.default);

    await deletePessoaService.execute(id);
    return response.status(200).send();
  }

  async show(request, response) {
    const {
      id
    } = request.params;

    const getPessoaByIdService = _tsyringe.container.resolve(_GetPessoaByIdService.default);

    const pessoa = await getPessoaByIdService.execute(id);
    return response.json(pessoa);
  }

  async index(request, response) {
    const getAllPessoasService = _tsyringe.container.resolve(_GetAllPessoasService.default);

    const pessoas = await getAllPessoasService.execute();
    return response.json(pessoas);
  }

}

exports.default = PessoaController;