"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateEnderecoTable1626577059045 = void 0;

var _typeorm = require("typeorm");

class CreateEnderecoTable1626577059045 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: "enderecos",
      columns: [{
        name: "rua",
        type: "varchar"
      }, {
        name: "cep",
        type: "varchar"
      }, {
        name: "numero",
        type: "integer"
      }, {
        name: "bairro",
        type: "varchar"
      }, {
        name: "cidade",
        type: "varchar"
      }, {
        name: "estado",
        type: "varchar"
      }, {
        isPrimary: true,
        name: "id",
        type: "uuid"
      }, {
        name: "created_at",
        type: "timestamp with time zone",
        default: "now()"
      }, {
        name: "updated_at",
        type: "timestamp with time zone",
        default: "now()"
      }],
      foreignKeys: [{
        name: "EnderecoPessoa",
        referencedTableName: "pessoas",
        referencedColumnNames: ["id"],
        columnNames: ["id"],
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable("enderecos");
  }

}

exports.CreateEnderecoTable1626577059045 = CreateEnderecoTable1626577059045;