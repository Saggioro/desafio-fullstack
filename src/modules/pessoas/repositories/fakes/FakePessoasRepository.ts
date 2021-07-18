import ICreatePessoaDTO from "@modules/pessoas/dtos/ICreatePessoaDTO";
import Pessoa from "@modules/pessoas/infra/typeorm/entities/Pessoa";
import IPessoasRepository from "@modules/pessoas/repositories/IPessoasRepository";
import { v4 } from "uuid";

class FakePessoasRepository implements IPessoasRepository {
    private repository: Pessoa[];

    constructor() {
        this.repository = [];
    }

    public async create({
        cpf,
        nacionalidade,
        naturalidade,
        nome,
        sexo,
        email,
        nascimento,
        endereco,
    }: ICreatePessoaDTO): Promise<Pessoa> {
        const pessoa = new Pessoa();
        const id = v4();
        Object.assign(pessoa, {
            id,
            cpf,
            nacionalidade,
            naturalidade,
            nome,
            sexo,
            email,
            nascimento,
            endereco: {
                ...endereco,
                id,
            },
        });
        await this.repository.push(pessoa);
        return pessoa;
    }

    public async all(): Promise<Pessoa[]> {
        const pessoas = await this.repository;
        return pessoas;
    }

    public async findById(id: string): Promise<Pessoa | undefined> {
        const pessoa = await this.repository.find((pessoa) => pessoa.id === id);
        return pessoa;
    }

    public async findByCpf(cpf: string): Promise<Pessoa | undefined> {
        const pessoa = await this.repository.find(
            (pessoa) => pessoa.cpf === cpf
        );
        return pessoa;
    }

    public async findByEmail(email: string): Promise<Pessoa | undefined> {
        const pessoa = await this.repository.find(
            (pessoa) => pessoa.email === email
        );
        return pessoa;
    }

    public async save(data: Pessoa): Promise<Pessoa> {
        const indexPessoa = await this.repository.findIndex(
            (pessoa) => data.id === pessoa.id
        );

        this.repository[indexPessoa] = data;

        return data;
    }

    public async delete(data: Pessoa): Promise<void> {
        const indexPessoa = await this.repository.findIndex(
            (pessoa) => pessoa.id === data.id
        );

        this.repository.splice(indexPessoa, 1);
    }
}

export default FakePessoasRepository;
