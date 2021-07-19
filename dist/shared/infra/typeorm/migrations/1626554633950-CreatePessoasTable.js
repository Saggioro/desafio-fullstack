"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreatePessoasTable1626554633950 = void 0;

var _typeorm = require("typeorm");

class CreatePessoasTable1626554633950 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: "pessoas",
      columns: [{
        name: "id",
        type: "uuid",
        isPrimary: true,
        generationStrategy: "uuid",
        default: "uuid_generate_v4()"
      }, {
        name: "email",
        type: "varchar",
        isNullable: true
      }, {
        name: "cpf",
        type: "varchar",
        isUnique: true
      }, {
        name: "nome",
        type: "varchar"
      }, {
        name: "sexo",
        type: "varchar",
        isNullable: true
      }, {
        name: "naturalidade",
        type: "varchar",
        isNullable: true
      }, {
        name: "nacionalidade",
        type: "varchar",
        isNullable: true
      }, {
        name: "nascimento",
        type: "date"
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
    await queryRunner.dropTable("pessoas");
  }

}

exports.CreatePessoasTable1626554633950 = CreatePessoasTable1626554633950;