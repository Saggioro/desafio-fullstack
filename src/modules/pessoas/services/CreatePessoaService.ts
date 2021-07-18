import { inject, injectable } from "tsyringe";

import IBrazilValuesProvider from "@shared/container/providers/BrazilValuesProvider/models/IBrazilValuesProvider";
import IDateProvider from "@shared/container/providers/DateProvider/models/IDateProvider";
import AppError, { IMessages } from "@shared/errors/AppError";

import Pessoa from "../infra/typeorm/entities/Pessoa";
import IPessoasRepository from "../repositories/IPessoasRepository";

interface IRequest {
    nome: string;
    sexo?: "Feminino" | "Masculino";
    nascimento: Date;
    naturalidade?: string;
    nacionalidade?: string;
    cpf: string;
    email?: string;
    endereco: {
        rua: string;
        numero: number;
        bairro: string;
        cidade: string;
        cep: string;
        estado: string;
    };
}

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
        endereco,
    }: IRequest): Promise<Pessoa> {
        const errors: IMessages[] = [];
        if (sexo !== "Masculino" && sexo !== "Feminino" && sexo !== undefined) {
            errors.push({
                message: "Sexo deve ser 'Feminino' ou 'Masculino'",
                field: "sexo",
            });
        }

        if (
            !cpf ||
            cpf.length !== 11 ||
            !this.brazilValuesProvider.validateCpf(cpf)
        ) {
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

        if (!endereco.bairro) {
            errors.push({
                message: "Bairro inválido",
                field: "bairro",
            });
        }
        if (
            !endereco.cep ||
            !this.brazilValuesProvider.validateCep(endereco.cep)
        ) {
            errors.push({
                message: "CEP inválido",
                field: "cep",
            });
        }
        if (!endereco.cidade) {
            errors.push({
                message: "Cidade inválida",
                field: "cidade",
            });
        }
        if (!endereco.estado) {
            errors.push({
                message: "Estado inválido",
                field: "estado",
            });
        }
        if (!endereco.numero) {
            errors.push({
                message: "Número inválido",
                field: "numero",
            });
        }
        if (!endereco.rua) {
            errors.push({
                message: "Rua inválida",
                field: "rua",
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
            endereco,
        });

        return pessoa;
    }
}
export default CreatePessoaService;
