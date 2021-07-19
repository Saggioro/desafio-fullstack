"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IPessoasRepository = _interopRequireDefault(require("../repositories/IPessoasRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let GetPessoaByIdService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("PessoasRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IPessoasRepository.default === "undefined" ? Object : _IPessoasRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class GetPessoaByIdService {
  constructor(pessoasRepository) {
    this.pessoasRepository = pessoasRepository;
  }

  async execute(id) {
    const pessoa = await this.pessoasRepository.findById(id);

    if (!pessoa) {
      throw new _AppError.default([{
        field: "id",
        message: "Pessoa não encontrada"
      }]);
    }

    return pessoa;
  }

}) || _class) || _class) || _class) || _class);
var _default = GetPessoaByIdService;
exports.default = _default;