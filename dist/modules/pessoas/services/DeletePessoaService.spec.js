"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakePessoasRepository = _interopRequireDefault(require("../repositories/fakes/FakePessoasRepository"));

var _DeletePessoaService = _interopRequireDefault(require("./DeletePessoaService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let deletePessoaService;
let fakePessoasRepository;
describe("Deletar pessoa", () => {
  beforeEach(() => {
    fakePessoasRepository = new _FakePessoasRepository.default();
    deletePessoaService = new _DeletePessoaService.default(fakePessoasRepository);
  });
  it("Deve permitir deletar uma Pessoa", async () => {
    const pessoa = await fakePessoasRepository.create({
      email: "teste@email.com",
      cpf: "12312312312",
      nascimento: new Date("1997-08-18"),
      sexo: "Masculino",
      nome: "Teste",
      naturalidade: "Recife",
      nacionalidade: "Brasilia"
    });
    await deletePessoaService.execute(pessoa.id);
    const pessoaDeletada = await fakePessoasRepository.findById(pessoa.id);
    expect(pessoaDeletada).toBe(undefined);
  });
  it("Não deve permitir deletar uma Pessoa inexistente", async () => {
    expect(async () => {
      await deletePessoaService.execute("inexistente");
    }).rejects.toBeInstanceOf(_AppError.default);
  });
});