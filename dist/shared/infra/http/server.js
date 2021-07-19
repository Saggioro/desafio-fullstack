"use strict";

var _app = require("./app");

const porta = process.env.PORT || 3333;

_app.app.listen(porta, () => {
  console.log(`Servidor iniciado na porta ${porta}`);
});