import { inject, injectable } from "tsyringe";

import Pessoa from "../infra/typeorm/entities/Pessoa";
import IPessoasRepository from "../repositories/IPessoasRepository";

@injectable()
class GetAllPessoasService {
    constructor(
        @inject("PessoasRepository")
        private pessoasRepository: IPessoasRepository
    ) {}

    public async execute(): Promise<Pessoa[]> {
        const pessoa = await this.pessoasRepository.all();

        return pessoa;
    }
}
export default GetAllPessoasService;
