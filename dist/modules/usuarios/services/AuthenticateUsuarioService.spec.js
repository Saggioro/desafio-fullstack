"use strict";

var _FakeHashProvider = _interopRequireDefault(require("../../../shared/container/providers/HashProvider/fakes/FakeHashProvider"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeUsuariosRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsuariosRepository"));

var _AuthenticateUsuarioService = _interopRequireDefault(require("./AuthenticateUsuarioService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsuariosRepository;
let fakeHashProvider;
let authenticateUsuario;
describe("Atenticação do usuário", () => {
  beforeEach(() => {
    fakeUsuariosRepository = new _FakeUsuariosRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    authenticateUsuario = new _AuthenticateUsuarioService.default(fakeUsuariosRepository, fakeHashProvider);
  });
  it("Deve autenticar o usuário", async () => {
    await fakeUsuariosRepository.create({
      login: "teste",
      senha: "123",
      ativo: true
    });
    const response = await authenticateUsuario.execute({
      login: "teste",
      senha: "123"
    });
    expect(response).toHaveProperty("token");
  });
  it("Não deve autenticar com um usuário inexistente", async () => {
    await expect(authenticateUsuario.execute({
      login: "inexistente",
      senha: "123"
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it("Não deve autenticar com uma senha incorreta", async () => {
    await fakeUsuariosRepository.create({
      login: "teste",
      senha: "123123",
      ativo: true
    });
    await expect(authenticateUsuario.execute({
      login: "teste",
      senha: "incorreta"
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it("Não deve autenticar com uma conta desativada", async () => {
    await fakeUsuariosRepository.create({
      login: "teste",
      senha: "123123",
      ativo: false
    });
    await expect(authenticateUsuario.execute({
      login: "teste",
      senha: "123123"
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});