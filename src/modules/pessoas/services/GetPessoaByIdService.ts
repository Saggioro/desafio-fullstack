import { inject, injectable } from "tsyringe";

import AppError from "@shared/errors/AppError";

import Pessoa from "../infra/typeorm/entities/Pessoa";
import IPessoasRepository from "../repositories/IPessoasRepository";

@injectable()
class GetPessoaByIdService {
    constructor(
        @inject("PessoasRepository")
        private pessoasRepository: IPessoasRepository
    ) {}

    public async execute(id: string): Promise<Pessoa> {
        const pessoa = await this.pessoasRepository.findById(id);

        if (!pessoa) {
            throw new AppError([
                {
                    field: "id",
                    message: "Pessoa não encontrada",
                },
            ]);
        }

        return pessoa;
    }
}
export default GetPessoaByIdService;
