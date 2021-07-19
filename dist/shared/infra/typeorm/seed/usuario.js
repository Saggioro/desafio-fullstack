"use strict";

var _bcrypt = require("bcrypt");

var _uuid = require("uuid");

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function create() {
  const connection = await (0, _index.default)();
  const senha = await (0, _bcrypt.hash)("stefanini123", 8);
  await connection.query(`
        INSERT INTO usuarios(id, login, senha, ativo, created_at)
         values('${(0, _uuid.v4)()}', 'stefanini', '${senha}', true, 'now()')
    `);
  await connection.close();
}

create().then(() => {
  console.log("Usuário criado!");
});