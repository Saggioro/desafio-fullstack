"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _ensureAuthenticated = _interopRequireDefault(require("../../../../../shared/infra/http/middlewares/ensureAuthenticated"));

var _PessoaController = _interopRequireDefault(require("../controllers/PessoaController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const pessoasRouter = (0, _express.Router)();
const pessoaController = new _PessoaController.default();
pessoasRouter.post("/", _ensureAuthenticated.default, pessoaController.create);
pessoasRouter.put("/", _ensureAuthenticated.default, pessoaController.update);
pessoasRouter.delete("/:id", _ensureAuthenticated.default, pessoaController.delete);
pessoasRouter.get("/:id", _ensureAuthenticated.default, pessoaController.show);
pessoasRouter.get("/", _ensureAuthenticated.default, pessoaController.index);
var _default = pessoasRouter;
exports.default = _default;