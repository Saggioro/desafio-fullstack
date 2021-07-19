"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakePessoasRepository = _interopRequireDefault(require("../repositories/fakes/FakePessoasRepository"));

var _GetPessoaByIdService = _interopRequireDefault(require("./GetPessoaByIdService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let getPessoaByIdService;
let fakePessoasRepository;
describe("Buscar pessoa pelo ID", () => {
  beforeEach(() => {
    fakePessoasRepository = new _FakePessoasRepository.default();
    getPessoaByIdService = new _GetPessoaByIdService.default(fakePessoasRepository);
  });
  it("Deve permitir buscar uma Pessoa", async () => {
    const pessoa = await fakePessoasRepository.create({
      email: "teste@email.com",
      cpf: "12312312312",
      nascimento: new Date("1997-08-18"),
      sexo: "Masculino",
      nome: "Teste",
      naturalidade: "Recife",
      nacionalidade: "Brasilia",
      endereco: {
        bairro: "teste",
        cep: "000000000",
        cidade: "teste",
        estado: "teste",
        numero: 11,
        rua: "teste"
      }
    });
    const pessoaEncontrada = await getPessoaByIdService.execute(pessoa.id);
    expect(pessoaEncontrada.id).toBe(pessoa.id);
  });
  it("Não deve permitir procurar uma Pessoa inexistente", async () => {
    expect(async () => {
      await getPessoaByIdService.execute("inexistente");
    }).rejects.toBeInstanceOf(_AppError.default);
  });
});