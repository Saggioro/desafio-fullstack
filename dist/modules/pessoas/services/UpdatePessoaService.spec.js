"use strict";

var _BrazilianValuesProvider = _interopRequireDefault(require("../../../shared/container/providers/BrazilValuesProvider/implementations/BrazilianValuesProvider"));

var _DatefnsProvider = _interopRequireDefault(require("../../../shared/container/providers/DateProvider/implementations/DatefnsProvider"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakePessoasRepository = _interopRequireDefault(require("../repositories/fakes/FakePessoasRepository"));

var _UpdatePessoaService = _interopRequireDefault(require("./UpdatePessoaService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let updatePessoaService;
let fakePessoasRepository;
let dateProvider;
let brazilValuesProvider;
describe("Atualizar pessoa", () => {
  beforeEach(() => {
    fakePessoasRepository = new _FakePessoasRepository.default();
    dateProvider = new _DatefnsProvider.default();
    brazilValuesProvider = new _BrazilianValuesProvider.default();
    updatePessoaService = new _UpdatePessoaService.default(fakePessoasRepository, dateProvider, brazilValuesProvider);
  });
  it("Deve permitir atualizar uma Pessoa", async () => {
    const pessoa = await fakePessoasRepository.create({
      email: "teste@email.com",
      cpf: "10297759400",
      nascimento: new Date("1997-08-18"),
      sexo: "Masculino",
      nome: "Teste",
      naturalidade: "Recife",
      nacionalidade: "Brasilia",
      endereco: {
        bairro: "teste",
        cep: "00000000",
        cidade: "teste",
        estado: "teste",
        rua: "rua",
        numero: 11
      }
    });
    pessoa.email = "teste2@email.com";
    pessoa.nome = "teste2@email.com";
    pessoa.nacionalidade = "teste2@email.com";
    pessoa.sexo = "Feminino";
    const pessoaAtualizada = await updatePessoaService.execute(pessoa);
    expect(pessoaAtualizada.email).toBe("teste2@email.com");
  });
  it("Não deve permitir atualizar uma nova Pessoa com um cpf já existente", async () => {
    expect(async () => {
      await fakePessoasRepository.create({
        email: "teste@email.com",
        cpf: "10297759400",
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
      const pessoa = await fakePessoasRepository.create({
        email: "teste2@email.com",
        cpf: "32132132112",
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
      pessoa.cpf = "10297759400";
      await updatePessoaService.execute(pessoa);
    }).rejects.toBeInstanceOf(_AppError.default);
  });
  it("Não deve permitir atualizar uma nova Pessoa com um email já existente", async () => {
    expect(async () => {
      await fakePessoasRepository.create({
        email: "teste@email.com",
        cpf: "10297759400",
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
      const pessoa = await fakePessoasRepository.create({
        email: "teste2@email.com",
        cpf: "15585403427",
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
      pessoa.email = "teste@email.com";
      await updatePessoaService.execute(pessoa);
    }).rejects.toBeInstanceOf(_AppError.default);
  });
  it("Não deve permitir atualizar uma nova Pessoa com um sexo inválido", async () => {
    expect(async () => {
      const pessoa = await fakePessoasRepository.create({
        email: "teste2@email.com",
        cpf: "15585403427",
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
      const pessoaAlterada = { ...pessoa
      };
      pessoaAlterada.sexo = "invalido";
      await updatePessoaService.execute(pessoaAlterada);
    }).rejects.toBeInstanceOf(_AppError.default);
  });
  it("Não deve permitir atualizar uma nova Pessoa com um email inválido", async () => {
    expect(async () => {
      const pessoa = await fakePessoasRepository.create({
        email: "teste2@email.com",
        cpf: "15585403427",
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
      pessoa.email = "invalido";
      await updatePessoaService.execute(pessoa);
    }).rejects.toBeInstanceOf(_AppError.default);
  });
  it("Não deve permitir atualizar uma nova Pessoa com uma data de nascimento inválida", async () => {
    expect(async () => {
      const pessoa = await fakePessoasRepository.create({
        email: "teste2@email.com",
        cpf: "15585403427",
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
      pessoa.nascimento = new Date("invalido");
      await updatePessoaService.execute(pessoa);
    }).rejects.toBeInstanceOf(_AppError.default);
  });
  it("Não deve permitir atualizar uma nova Pessoa com um nome inválido", async () => {
    expect(async () => {
      const pessoa = await fakePessoasRepository.create({
        email: "teste2@email.com",
        cpf: "15585403427",
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
      pessoa.nome = "";
      await updatePessoaService.execute(pessoa);
    }).rejects.toBeInstanceOf(_AppError.default);
  });
  it("Não deve permitir atualizar uma nova Pessoa com uma rua inválida", async () => {
    expect(async () => {
      const pessoa = await fakePessoasRepository.create({
        email: "teste2@email.com",
        cpf: "15585403427",
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
      pessoa.endereco.rua = "";
      await updatePessoaService.execute(pessoa);
    }).rejects.toBeInstanceOf(_AppError.default);
  });
  it("Não deve permitir atualizar uma nova Pessoa com um estado inválido", async () => {
    expect(async () => {
      const pessoa = await fakePessoasRepository.create({
        email: "teste2@email.com",
        cpf: "15585403427",
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
      pessoa.endereco.estado = "";
      await updatePessoaService.execute(pessoa);
    }).rejects.toBeInstanceOf(_AppError.default);
  });
  it("Não deve permitir atualizar uma nova Pessoa com um bairro inválid", async () => {
    expect(async () => {
      const pessoa = await fakePessoasRepository.create({
        email: "teste2@email.com",
        cpf: "15585403427",
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
      pessoa.endereco.bairro = "";
      await updatePessoaService.execute(pessoa);
    }).rejects.toBeInstanceOf(_AppError.default);
  });
  it("Não deve permitir atualizar uma nova Pessoa com uma cidade inválida", async () => {
    expect(async () => {
      const pessoa = await fakePessoasRepository.create({
        email: "teste2@email.com",
        cpf: "15585403427",
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
      pessoa.endereco.cidade = "";
      await updatePessoaService.execute(pessoa);
    }).rejects.toBeInstanceOf(_AppError.default);
  });
  it("Não deve permitir atualizar uma nova Pessoa com um numero de endereço inválido", async () => {
    expect(async () => {
      const pessoa = await fakePessoasRepository.create({
        email: "teste2@email.com",
        cpf: "15585403427",
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
      pessoa.endereco.numero = Number("invalido");
      await updatePessoaService.execute(pessoa);
    }).rejects.toBeInstanceOf(_AppError.default);
  });
  it("Não deve permitir atualizar uma nova Pessoa com um cep inválido", async () => {
    expect(async () => {
      const pessoa = await fakePessoasRepository.create({
        email: "teste2@email.com",
        cpf: "15585403427",
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
      pessoa.endereco.cep = "";
      await updatePessoaService.execute(pessoa);
    }).rejects.toBeInstanceOf(_AppError.default);
  });
});