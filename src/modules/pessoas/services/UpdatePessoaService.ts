import { inject, injectable } from "tsyringe";

import IBrazilValuesProvider from "@shared/container/providers/BrazilValuesProvider/models/IBrazilValuesProvider";
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
        private dateProvider: IDateProvider,

        @inject("BrazilValuesProvider")
        private brazilValuesProvider: IBrazilValuesProvider
    ) {}

    public async execute(data: Pessoa): Promise<Pessoa> {
        const errors: IMessages[] = [];
        if (
            data.sexo !== "Masculino" &&
            data.sexo !== "Feminino" &&
            data.sexo !== undefined
        ) {
            errors.push({
                message: "Sexo deve ser 'Feminino' ou 'Masculino'",
                field: "sexo",
            });
        }

        if (
            !data.cpf ||
            data.cpf.length !== 11 ||
            !this.brazilValuesProvider.validateCpf(data.cpf)
        ) {
            errors.push({
                message: "CPF inválido",
                field: "cpf",
            });
        } else {
            const sameCpf = await this.pessoasRepository.findByCpf(data.cpf);

            if (sameCpf && sameCpf.id !== data.id) {
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
                    message: "O email inválido",
                    field: "email",
                });
            }
            const sameEmail = await this.pessoasRepository.findByEmail(
                data.email
            );
            if (sameEmail && sameEmail.id !== data.id) {
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
                message: "Data de nascimento inválida",
                field: "nascimento",
            });
        }

        if (!data.nome) {
            errors.push({
                message: "Nome inválido",
                field: "nome",
            });
        }
        if (!data.endereco.bairro) {
            errors.push({
                message: "Bairro inválido",
                field: "bairro",
            });
        }
        if (
            !data.endereco.cep ||
            !this.brazilValuesProvider.validateCep(data.endereco.cep)
        ) {
            errors.push({
                message: "CEP inválido",
                field: "cep",
            });
        }
        if (!data.endereco.cidade) {
            errors.push({
                message: "Cidade inválida",
                field: "cidade",
            });
        }
        if (!data.endereco.estado) {
            errors.push({
                message: "Estado inválido",
                field: "estado",
            });
        }
        if (!data.endereco.numero) {
            errors.push({
                message: "Número inválido",
                field: "numero",
            });
        }
        if (!data.endereco.rua) {
            errors.push({
                message: "Rua inválida",
                field: "rua",
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
