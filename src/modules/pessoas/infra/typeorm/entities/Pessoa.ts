import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity("pessoas")
class Pessoa {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    nome: string;

    @Column()
    sexo: "Feminino" | "Masculino" | undefined;

    @Column()
    nascimento: Date;

    @Column()
    naturalidade: string;

    @Column()
    nacionalidade: string;

    @Column()
    cpf: string;

    @Column()
    email?: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Pessoa;
