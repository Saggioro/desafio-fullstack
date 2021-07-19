"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _brazilianValues = require("brazilian-values");

class BrazilianValuesProvider {
  validateCpf(payload) {
    return (0, _brazilianValues.isCPF)(payload);
  }

  validateCep(payload) {
    return (0, _brazilianValues.isCEP)(payload);
  }

}

var _default = BrazilianValuesProvider;
exports.default = _default;