"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _auth = _interopRequireDefault(require("../../../config/auth"));

var _jsonwebtoken = require("jsonwebtoken");

var _tsyringe = require("tsyringe");

var _IHashProvider = _interopRequireDefault(require("../../../shared/container/providers/HashProvider/models/IHashProvider"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IUsuariosRepository = _interopRequireDefault(require("../repositories/IUsuariosRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let AuthenticateUsuarioService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("UsuariosRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("HashProvider")(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IUsuariosRepository.default === "undefined" ? Object : _IUsuariosRepository.default, typeof _IHashProvider.default === "undefined" ? Object : _IHashProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class AuthenticateUsuarioService {
  constructor(usuariosRepository, hashProvider) {
    this.usuariosRepository = usuariosRepository;
    this.hashProvider = hashProvider;
  }

  async execute({
    login,
    senha
  }) {
    const usuario = await this.usuariosRepository.findByLogin(login);

    if (!usuario) {
      throw new _AppError.default([{
        message: "Login ou senha incorreta",
        field: "login"
      }]);
    }

    const senhaCorreta = await this.hashProvider.compareHash(senha, usuario.senha);

    if (!senhaCorreta) {
      throw new _AppError.default([{
        message: "Login ou senha incorreta",
        field: "login"
      }]);
    }

    if (!usuario.ativo) {
      throw new _AppError.default([{
        message: "Conta desativada. Entre em contato com o seu supervisor",
        field: "login"
      }]);
    }

    const token = (0, _jsonwebtoken.sign)({}, _auth.default.jwt.secret, {
      subject: usuario.id,
      expiresIn: _auth.default.jwt.expiresIn
    });
    return {
      token
    };
  }

}) || _class) || _class) || _class) || _class) || _class);
var _default = AuthenticateUsuarioService;
exports.default = _default;