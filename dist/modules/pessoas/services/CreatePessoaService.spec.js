"use strict";

var _BrazilianValuesProvider = _interopRequireDefault(require("../../../shared/container/providers/BrazilValuesProvider/implementations/BrazilianValuesProvider"));

var _DatefnsProvider = _interopRequireDefault(require("../../../shared/container/providers/DateProvider/implementations/DatefnsProvider"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakePessoasRepository = _interopRequireDefault(require("../repositories/fakes/FakePessoasRepository"));

var _CreatePessoaService = _interopRequireDefault(require("./CreatePessoaService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let createPessoaService;
let fakePessoasRepository;
let dateProvider;
let brazilValuesProvider;
describe("Criar pessoa", () => {
  beforeEach(() => {
    fakePessoasRepository = new _FakePessoasRepository.default();
    dateProvider = new _DatefnsProvider.default();
    brazilValuesProvider = new _BrazilianValuesProvider.default();
    createPessoaService = new _CreatePessoaService.default(fakePessoasRepository, dateProvider, brazilValuesProvider);
  });
  it("Deve permitir criar uma nova Pessoa", async () => {
    await createPessoaService.execute({
      email: "teste@email.com",
      cpf: "10297759400",
      nascimento: new Date("1997-08-18"),
      sexo: "Masculino",
      nome: "Teste",
      naturalidade: "Recife",
      nacionalidade: "Brasil"
    });
    const pessoa = await fakePessoasRepository.findByCpf("10297759400");
    expect(pessoa).toHaveProperty("id");
  });
  it("Não deve permitir criar uma nova Pessoa com o mesmo cpf", async () => {
    expect(async () => {
      const pessoa = {
        email: "teste@email.com",
        cpf: "10297759400",
        nascimento: new Date("1997-08-18"),
        sexo: "Masculino",
        nome: "Teste",
        naturalidade: "Recife",
        nacionalidade: "Brasil"
      };
      await createPessoaService.execute(pessoa);
      pessoa.email = "";
      await createPessoaService.execute(pessoa);
    }).rejects.toBeInstanceOf(_AppError.default);
  });
  it("Não deve permitir criar uma nova Pessoa com o mesmo email", async () => {
    expect(async () => {
      const pessoa = {
        email: "teste@email.com",
        cpf: "10297759400",
        nascimento: new Date("1997-08-18"),
        sexo: "Masculino",
        nome: "Teste",
        naturalidade: "Recife",
        nacionalidade: "Brasil"
      };
      await createPessoaService.execute(pessoa);
      pessoa.cpf = "12312312311";
      await createPessoaService.execute(pessoa);
    }).rejects.toBeInstanceOf(_AppError.default);
  });
  it("Não deve permitir criar uma nova Pessoa com um email inválido", async () => {
    expect(async () => {
      const pessoa = {
        email: "invalido",
        cpf: "12312312312",
        nascimento: new Date("1997-08-18"),
        sexo: "Masculino",
        nome: "Teste",
        naturalidade: "Recife",
        nacionalidade: "Brasil"
      };
      await createPessoaService.execute(pessoa);
    }).rejects.toBeInstanceOf(_AppError.default);
  });
  it("Não deve permitir criar uma nova Pessoa com um cpf inválido", async () => {
    expect(async () => {
      const pessoa = {
        email: "teste@email.com",
        cpf: "invalido",
        nascimento: new Date("1997-08-18"),
        sexo: "Masculino",
        nome: "Teste",
        naturalidade: "Recife",
        nacionalidade: "Brasil"
      };
      await createPessoaService.execute(pessoa);
    }).rejects.toBeInstanceOf(_AppError.default);
  });
  it("Não deve permitir criar uma nova Pessoa com um data de nascimento inválida", async () => {
    expect(async () => {
      const pessoa = {
        email: "teste@email.com",
        cpf: "12312312312",
        nascimento: new Date("invalido"),
        sexo: "Masculino",
        nome: "Teste",
        naturalidade: "Recife",
        nacionalidade: "Brasil"
      };
      await createPessoaService.execute(pessoa);
    }).rejects.toBeInstanceOf(_AppError.default);
  });
  it("Não deve permitir criar uma nova Pessoa com um sexo inválido", async () => {
    expect(async () => {
      const pessoa = {
        email: "teste@email.com",
        cpf: "12312312312",
        nascimento: new Date("1997-08-18"),
        sexo: "invalido",
        nome: "Teste",
        naturalidade: "Recife",
        nacionalidade: "Brasil"
      };
      await createPessoaService.execute(pessoa);
    }).rejects.toBeInstanceOf(_AppError.default);
  });
  it("Não deve permitir criar uma nova Pessoa com um nome inválido", async () => {
    expect(async () => {
      const pessoa = {
        email: "teste@email.com",
        cpf: "12312312312",
        nascimento: new Date("1997-08-18"),
        sexo: "invalido",
        naturalidade: "Recife",
        nacionalidade: "Brasil"
      };
      await createPessoaService.execute(pessoa);
    }).rejects.toBeInstanceOf(_AppError.default);
  });
});