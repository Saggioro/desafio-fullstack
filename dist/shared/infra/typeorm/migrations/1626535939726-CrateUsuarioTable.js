"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CrateUsuarioTable1626535939726 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: "usuarios",
      columns: [{
        name: "id",
        type: "uuid",
        isPrimary: true,
        generationStrategy: "uuid",
        default: "uuid_generate_v4()"
      }, {
        name: "login",
        type: "varchar"
      }, {
        name: "senha",
        type: "varchar"
      }, {
        name: "ativo",
        type: "boolean"
      }, {
        name: "created_at",
        type: "timestamp with time zone",
        default: "now()"
      }, {
        name: "updated_at",
        type: "timestamp with time zone",
        default: "now()"
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable("usuarios");
  }

}

exports.default = CrateUsuarioTable1626535939726;