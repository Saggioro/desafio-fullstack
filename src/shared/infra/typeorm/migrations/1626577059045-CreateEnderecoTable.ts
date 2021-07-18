import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateEnderecoTable1626577059045 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "enderecos",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "rua",
                        type: "varchar",
                    },
                    {
                        name: "cep",
                        type: "varchar",
                    },
                    {
                        name: "numero",
                        type: "integer",
                    },
                    {
                        name: "bairro",
                        type: "varchar",
                    },
                    {
                        name: "cidade",
                        type: "varchar",
                    },
                    {
                        name: "estado",
                        type: "varchar",
                    },
                    {
                        name: "pessoa_id",
                        type: "uuid",
                    },
                    {
                        name: "created_at",
                        type: "timestamp with time zone",
                        default: "now()",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp with time zone",
                        default: "now()",
                    },
                ],
                foreignKeys: [
                    {
                        name: "EnderecoPessoa",
                        referencedTableName: "pessoas",
                        referencedColumnNames: ["id"],
                        columnNames: ["pessoa_id"],
                        onUpdate: "CASCADE",
                        onDelete: "CASCADE",
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("enderecos");
    }
}