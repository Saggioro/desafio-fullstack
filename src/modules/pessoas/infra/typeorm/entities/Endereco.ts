import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryColumn,
    OneToOne,
    JoinColumn,
} from "typeorm";

import Pessoa from "./Pessoa";

@Entity("enderecos")
class Endereco {
    @PrimaryColumn()
    id: string;

    @OneToOne(() => Pessoa)
    @JoinColumn({ name: "id", referencedColumnName: "id" })
    pessoa: Pessoa;

    @Column()
    rua: string;

    @Column()
    numero: number;

    @Column()
    bairro: string;

    @Column()
    cidade: string;

    @Column()
    cep: string;

    @Column()
    estado: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Endereco;
