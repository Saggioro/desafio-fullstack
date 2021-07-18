import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinTable,
} from "typeorm";

import Endereco from "./Endereco";

@Entity("pessoas")
class Pessoa {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    nome: string;

    @Column()
    sexo?: "Feminino" | "Masculino";

    @Column()
    nascimento: Date;

    @Column()
    naturalidade?: string;

    @Column()
    nacionalidade?: string;

    @Column()
    cpf: string;

    @Column()
    email?: string;

    @OneToOne(() => Endereco, (endereco) => endereco.pessoa, {
        eager: true,
        cascade: true,
    })
    @JoinTable()
    endereco: Endereco;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Pessoa;
