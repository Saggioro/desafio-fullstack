"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IBrazilValuesProvider = _interopRequireDefault(require("../../../shared/container/providers/BrazilValuesProvider/models/IBrazilValuesProvider"));

var _IDateProvider = _interopRequireDefault(require("../../../shared/container/providers/DateProvider/models/IDateProvider"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IPessoasRepository = _interopRequireDefault(require("../repositories/IPessoasRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UpdatePessoaService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("PessoasRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("DateProvider")(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)("BrazilValuesProvider")(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IPessoasRepository.default === "undefined" ? Object : _IPessoasRepository.default, typeof _IDateProvider.default === "undefined" ? Object : _IDateProvider.default, typeof _IBrazilValuesProvider.default === "undefined" ? Object : _IBrazilValuesProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class UpdatePessoaService {
  constructor(pessoasRepository, dateProvider, brazilValuesProvider) {
    this.pessoasRepository = pessoasRepository;
    this.dateProvider = dateProvider;
    this.brazilValuesProvider = brazilValuesProvider;
  }

  async execute(data) {
    const errors = [];

    if (data.sexo !== "Masculino" && data.sexo !== "Feminino" && data.sexo !== undefined) {
      errors.push({
        message: "Sexo deve ser 'Feminino' ou 'Masculino'",
        field: "sexo"
      });
    }

    if (!data.cpf || data.cpf.length !== 11 || !this.brazilValuesProvider.validateCpf(data.cpf)) {
      errors.push({
        message: "CPF inválido",
        field: "cpf"
      });
    } else {
      const sameCpf = await this.pessoasRepository.findByCpf(data.cpf);

      if (sameCpf && sameCpf.id !== data.id) {
        errors.push({
          message: "O CPF enviado já está sendo utilizado",
          field: "cpf"
        });
      }
    }

    if (data.email) {
      const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

      if (!emailRegexp.test(data.email)) {
        errors.push({
          message: "O email inválido",
          field: "email"
        });
      }

      const sameEmail = await this.pessoasRepository.findByEmail(data.email);

      if (sameEmail && sameEmail.id !== data.id) {
        errors.push({
          message: "O email enviado já está sendo utilizado",
          field: "email"
        });
      }
    }

    if (!this.dateProvider.validate(new Date(data.nascimento)) || !this.dateProvider.beforeToday(new Date(data.nascimento))) {
      errors.push({
        message: "Data de nascimento inválida",
        field: "nascimento"
      });
    }

    if (!data.nome) {
      errors.push({
        message: "Nome inválido",
        field: "nome"
      });
    }

    if (errors.length > 0) {
      throw new _AppError.default(errors);
    }

    const pessoa = await this.pessoasRepository.save(data);
    return pessoa;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
var _default = UpdatePessoaService;
exports.default = _default;