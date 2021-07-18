import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity("enderecos")
class Endereco {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    pessoa_id: string;

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
