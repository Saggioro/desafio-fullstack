import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePessoasTable1626554633950 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "pessoas",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "email",
                        type: "varchar",
                    },
                    {
                        name: "cpf",
                        type: "varchar",
                    },
                    {
                        name: "nome",
                        type: "varchar",
                    },
                    {
                        name: "sexo",
                        type: "varchar",
                    },
                    {
                        name: "naturalidade",
                        type: "varchar",
                    },
                    {
                        name: "nacionalidade",
                        type: "varchar",
                    },

                    {
                        name: "nascimento",
                        type: "date",
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
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
