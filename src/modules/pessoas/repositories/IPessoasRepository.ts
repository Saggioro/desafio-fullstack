import ICreatePessoaDTO from "../dtos/ICreatePessoaDTO";
import Pessoa from "../infra/typeorm/entities/Pessoa";

export default interface IPessoasRepository {
    findById(id: string): Promise<Pessoa | undefined>;
    findByEmail(email: string): Promise<Pessoa | undefined>;
    findByCpf(cpf: string): Promise<Pessoa | undefined>;
    create(data: ICreatePessoaDTO): Promise<Pessoa>;
    delete(pessoa: Pessoa): Promise<void>;
    save(pessoa: Pessoa): Promise<Pessoa>;
    all(): Promise<Pessoa[]>;
}
