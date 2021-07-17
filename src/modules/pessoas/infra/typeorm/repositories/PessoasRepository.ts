import ICreatePessoaDTO from "@modules/pessoas/dtos/ICreatePessoaDTO";
import IPessoasRepository from "@modules/pessoas/repositories/IPessoasRepository";
import { getRepository, Repository } from "typeorm";

import Pessoa from "../entities/Pessoa";

class PessoasRepository implements IPessoasRepository {
    private ormRepository: Repository<Pessoa>;

    constructor() {
        this.ormRepository = getRepository(Pessoa);
    }

    public async create(data: ICreatePessoaDTO): Promise<Pessoa> {
        const pessoa = this.ormRepository.create(data);
        await this.ormRepository.save(pessoa);
        return pessoa;
    }

    public async all(): Promise<Pessoa[]> {
        const pessoas = await this.ormRepository.find();
        return pessoas;
    }

    public async findById(id: string): Promise<Pessoa | undefined> {
        const pessoa = await this.ormRepository.findOne({ where: { id } });
        return pessoa;
    }

    public async findByCpf(cpf: string): Promise<Pessoa | undefined> {
        const pessoa = await this.ormRepository.findOne({ where: { cpf } });
        return pessoa;
    }

    public async findByEmail(email: string): Promise<Pessoa | undefined> {
        const pessoa = await this.ormRepository.findOne({ where: { email } });
        return pessoa;
    }

    public async save(pessoa: Pessoa): Promise<Pessoa> {
        return this.ormRepository.save(pessoa);
    }

    public async delete(pessoa: Pessoa): Promise<void> {
        await this.ormRepository.remove(pessoa);
    }
}

export default PessoasRepository;
