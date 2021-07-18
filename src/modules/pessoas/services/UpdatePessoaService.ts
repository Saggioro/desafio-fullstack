import { inject, injectable } from "tsyringe";

import IDateProvider from "@shared/container/providers/DateProvider/models/IDateProvider";
import AppError, { IMessages } from "@shared/errors/AppError";

import Pessoa from "../infra/typeorm/entities/Pessoa";
import IPessoasRepository from "../repositories/IPessoasRepository";

@injectable()
class UpdatePessoaService {
    constructor(
        @inject("PessoasRepository")
        private pessoasRepository: IPessoasRepository,

        @inject("DateProvider")
        private dateProvider: IDateProvider
    ) {}

    public async execute(data: Pessoa): Promise<Pessoa> {
        const errors: IMessages[] = [];
        if (data.sexo !== "Masculino" && data.sexo !== "Feminino") {
            errors.push({
                message: "Sexo deve ser 'Feminino' ou 'Masculino'",
                field: "sexo",
            });
        }

        if (data.cpf && data.cpf.length !== 11) {
            errors.push({
                message: "CPF enviado está inválido",
                field: "cpf",
            });
        } else {
            const sameCpf = await this.pessoasRepository.findByCpf(data.cpf);

            if (sameCpf) {
                errors.push({
                    message: "O CPF enviado já está sendo utilizado",
                    field: "cpf",
                });
            }
        }

        if (data.email) {
            const emailRegexp =
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
            if (!emailRegexp.test(data.email)) {
                errors.push({
                    message: "O email enviado é inválido",
                    field: "email",
                });
            }
            const sameEmail = await this.pessoasRepository.findByEmail(
                data.email
            );
            if (sameEmail) {
                errors.push({
                    message: "O email enviado já está sendo utilizado",
                    field: "email",
                });
            }
        }

        if (
            !this.dateProvider.validate(new Date(data.nascimento)) ||
            !this.dateProvider.beforeToday(new Date(data.nascimento))
        ) {
            errors.push({
                message: "Data enviada está inválida",
                field: "nascimento",
            });
        }

        if (errors.length > 0) {
            throw new AppError(errors);
        }

        const pessoa = await this.pessoasRepository.save(data);

        return pessoa;
    }
}
export default UpdatePessoaService;
