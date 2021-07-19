"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dateFns = require("date-fns");

class DatefnsProvider {
  validate(payload) {
    return (0, _dateFns.isValid)(payload);
  }

  format(payload) {
    return (0, _dateFns.formatISO)(payload, {
      representation: "date"
    });
  }

  beforeToday(payload) {
    return (0, _dateFns.isBefore)(payload, new Date());
  }

}

var _default = DatefnsProvider;
exports.default = _default;