import { inject, injectable } from "tsyringe";

import IBrazilValuesProvider from "@shared/container/providers/BrazilValuesProvider/models/IBrazilValuesProvider";
import IDateProvider from "@shared/container/providers/DateProvider/models/IDateProvider";
import AppError, { IMessages } from "@shared/errors/AppError";

import ICreatePessoaDTO from "../dtos/ICreatePessoaDTO";
import Pessoa from "../infra/typeorm/entities/Pessoa";
import IPessoasRepository from "../repositories/IPessoasRepository";

@injectable()
class CreatePessoaService {
    constructor(
        @inject("PessoasRepository")
        private pessoasRepository: IPessoasRepository,

        @inject("DateProvider")
        private dateProvider: IDateProvider,

        @inject("BrazilValuesProvider")
        private brazilValuesProvider: IBrazilValuesProvider
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
        const errors: IMessages[] = [];
        if (sexo !== "Masculino" && sexo !== "Feminino" && sexo !== undefined) {
            errors.push({
                message: "Sexo deve ser 'Feminino' ou 'Masculino'",
                field: "sexo",
            });
        }

        if (cpf && !this.brazilValuesProvider.validateCpf(cpf)) {
            errors.push({
                message: "CPF enviado está inválido",
                field: "cpf",
            });
        } else {
            const sameCpf = await this.pessoasRepository.findByCpf(cpf);

            if (sameCpf) {
                errors.push({
                    message: "O CPF enviado já está sendo utilizado",
                    field: "cpf",
                });
            }
        }

        if (email) {
            const emailRegexp =
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
            if (!emailRegexp.test(email)) {
                errors.push({
                    message: "O email enviado é inválido",
                    field: "email",
                });
            }
            const sameEmail = await this.pessoasRepository.findByEmail(email);
            if (sameEmail) {
                errors.push({
                    message: "O email enviado já está sendo utilizado",
                    field: "email",
                });
            }
        }

        if (
            !this.dateProvider.validate(new Date(nascimento)) ||
            !this.dateProvider.beforeToday(new Date(nascimento))
        ) {
            errors.push({
                message: "Data enviada está inválida",
                field: "nascimento",
            });
        }

        if (!nome) {
            errors.push({
                message: "Nome inválido",
                field: "nome",
            });
        }

        if (errors.length > 0) {
            throw new AppError(errors);
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
