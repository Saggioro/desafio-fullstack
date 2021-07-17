import { inject, injectable } from "tsyringe";

import IDateProvider from "@shared/container/providers/DateProvider/models/IDateProvider";
import AppError from "@shared/errors/AppError";

import ICreatePessoaDTO from "../dtos/ICreatePessoaDTO";
import Pessoa from "../infra/typeorm/entities/Pessoa";
import IPessoasRepository from "../repositories/IPessoasRepository";

@injectable()
class CreatePessoaService {
    constructor(
        @inject("PessoasRepository")
        private pessoasRepository: IPessoasRepository,

        @inject("DateProvider")
        private dateProvider: IDateProvider
    ) {}

    public async execute({
        cpf,
        nacionalidade,
        nascimento,
        naturalidade,
        nome,
        sexo,
        email,
    }: ICreatePessoaDTO): Promise<Pessoa> {
        if (sexo !== "Masculino" && sexo !== "Feminino") {
            throw new AppError("Sexo deve ser 'Feminino' ou 'Masculino'");
        }

        if (cpf && cpf.length !== 11) {
            throw new AppError("CPF enviado está inválido", 400);
        }
        const sameCpf = await this.pessoasRepository.findByCpf(cpf);

        if (sameCpf) {
            throw new AppError("O CPF enviado já está sendo utilizado");
        }

        if (email) {
            const emailRegexp =
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
            if (!emailRegexp.test(email)) {
                throw new AppError("O email enviado é inválido");
            }
            const sameEmail = await this.pessoasRepository.findByEmail(email);
            if (sameEmail) {
                throw new AppError("O email enviado já está sendo utilizado");
            }
        }

        if (
            !this.dateProvider.validate(new Date(nascimento)) ||
            !this.dateProvider.beforeToday(new Date(nascimento))
        ) {
            throw new AppError("Data enviada está inválida");
        }

        const pessoa = await this.pessoasRepository.create({
            cpf,
            email,
            nacionalidade,
            sexo,
            nome,
            naturalidade,
            nascimento,
        });

        return pessoa;
    }
}
export default CreatePessoaService;
