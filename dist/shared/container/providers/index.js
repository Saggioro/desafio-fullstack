"use strict";

var _tsyringe = require("tsyringe");

var _BrazilianValuesProvider = _interopRequireDefault(require("./BrazilValuesProvider/implementations/BrazilianValuesProvider"));

var _DatefnsProvider = _interopRequireDefault(require("./DateProvider/implementations/DatefnsProvider"));

var _BCryptHashProvider = _interopRequireDefault(require("./HashProvider/implementations/BCryptHashProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tsyringe.container.registerSingleton("DateProvider", _DatefnsProvider.default);

_tsyringe.container.registerSingleton("HashProvider", _BCryptHashProvider.default);

_tsyringe.container.registerSingleton("BrazilValuesProvider", _BrazilianValuesProvider.default);