import { inject, injectable } from "tsyringe";

import AppError from "@shared/errors/AppError";

import IPessoasRepository from "../repositories/IPessoasRepository";

@injectable()
class DeletePessoaService {
    constructor(
        @inject("PessoasRepository")
        private pessoasRepository: IPessoasRepository
    ) {}

    public async execute(id: string): Promise<void> {
        const pessoa = await this.pessoasRepository.findById(id);

        if (!pessoa) {
            throw new AppError([
                {
                    field: "id",
                    message: "Pessoa não encontrada",
                },
            ]);
        }

        await this.pessoasRepository.delete(pessoa);
    }
}
export default DeletePessoaService;
