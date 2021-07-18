import BrazilianValuesProvider from "@shared/container/providers/BrazilValuesProvider/implementations/BrazilianValuesProvider";
import IBrazilValuesProvider from "@shared/container/providers/BrazilValuesProvider/models/IBrazilValuesProvider";
import DatefnsProvider from "@shared/container/providers/DateProvider/implementations/DatefnsProvider";
import IDateProvider from "@shared/container/providers/DateProvider/models/IDateProvider";
import AppError from "@shared/errors/AppError";

import ICreatePessoaDTO from "../dtos/ICreatePessoaDTO";
import FakePessoasRepository from "../repositories/fakes/FakePessoasRepository";
import IPessoasRepository from "../repositories/IPessoasRepository";
import CreatePessoaService from "./CreatePessoaService";

let createPessoaService: CreatePessoaService;
let fakePessoasRepository: IPessoasRepository;
let dateProvider: IDateProvider;
let brazilValuesProvider: IBrazilValuesProvider;

describe("Criar pessoa", () => {
    beforeEach(() => {
        fakePessoasRepository = new FakePessoasRepository();
        dateProvider = new DatefnsProvider();
        brazilValuesProvider = new BrazilianValuesProvider();

        createPessoaService = new CreatePessoaService(
            fakePessoasRepository,
            dateProvider,
            brazilValuesProvider
        );
    });

    it("Deve permitir criar uma nova Pessoa", async () => {
        await createPessoaService.execute({
            email: "teste@email.com",
            cpf: "10297759400",
            nascimento: new Date("1997-08-18"),
            sexo: "Masculino",
            nome: "Teste",
            naturalidade: "Recife",
            nacionalidade: "Brasil",
            endereco: {
                bairro: "teste",
                cep: "00000000",
                cidade: "teste",
                estado: "teste",
                numero: 11,
                rua: "teste",
            },
        });

        const pessoa = await fakePessoasRepository.findByCpf("10297759400");

        expect(pessoa).toHaveProperty("id");
    });
    it("Não deve permitir criar uma nova Pessoa com o mesmo cpf", async () => {
        expect(async () => {
            const pessoa: ICreatePessoaDTO = {
                email: "teste@email.com",
                cpf: "10297759400",
                nascimento: new Date("1997-08-18"),
                sexo: "Masculino",
                nome: "Teste",
                naturalidade: "Recife",
                nacionalidade: "Brasil",
                endereco: {
                    bairro: "teste",
                    cep: "00000000",
                    cidade: "teste",
                    estado: "teste",
                    numero: 11,
                    rua: "teste",
                },
            };
            await createPessoaService.execute(pessoa);

            pessoa.email = "";

            await createPessoaService.execute(pessoa);
        }).rejects.toBeInstanceOf(AppError);
    });
    it("Não deve permitir criar uma nova Pessoa com o mesmo email", async () => {
        expect(async () => {
            const pessoa: ICreatePessoaDTO = {
                email: "teste@email.com",
                cpf: "10297759400",
                nascimento: new Date("1997-08-18"),
                sexo: "Masculino",
                nome: "Teste",
                naturalidade: "Recife",
                nacionalidade: "Brasil",
                endereco: {
                    bairro: "teste",
                    cep: "00000000",
                    cidade: "teste",
                    estado: "teste",
                    numero: 11,
                    rua: "teste",
                },
            };
            await createPessoaService.execute(pessoa);

            pessoa.cpf = "12312312311";

            await createPessoaService.execute(pessoa);
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Não deve permitir criar uma nova Pessoa com um email inválido", async () => {
        expect(async () => {
            const pessoa: ICreatePessoaDTO = {
                email: "invalido",
                cpf: "12312312312",
                nascimento: new Date("1997-08-18"),
                sexo: "Masculino",
                nome: "Teste",
                naturalidade: "Recife",
                nacionalidade: "Brasil",
                endereco: {
                    bairro: "teste",
                    cep: "00000000",
                    cidade: "teste",
                    estado: "teste",
                    numero: 11,
                    rua: "teste",
                },
            };
            await createPessoaService.execute(pessoa);
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Não deve permitir criar uma nova Pessoa com um cpf inválido", async () => {
        expect(async () => {
            const pessoa: ICreatePessoaDTO = {
                email: "teste@email.com",
                cpf: "invalido",
                nascimento: new Date("1997-08-18"),
                sexo: "Masculino",
                nome: "Teste",
                naturalidade: "Recife",
                nacionalidade: "Brasil",
                endereco: {
                    bairro: "teste",
                    cep: "00000000",
                    cidade: "teste",
                    estado: "teste",
                    numero: 11,
                    rua: "teste",
                },
            };
            await createPessoaService.execute(pessoa);
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Não deve permitir criar uma nova Pessoa com um data de nascimento inválida", async () => {
        expect(async () => {
            const pessoa: ICreatePessoaDTO = {
                email: "teste@email.com",
                cpf: "12312312312",
                nascimento: new Date("invalido"),
                sexo: "Masculino",
                nome: "Teste",
                naturalidade: "Recife",
                nacionalidade: "Brasil",
                endereco: {
                    bairro: "teste",
                    cep: "00000000",
                    cidade: "teste",
                    estado: "teste",
                    numero: 11,
                    rua: "teste",
                },
            };
            await createPessoaService.execute(pessoa);
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Não deve permitir criar uma nova Pessoa com um sexo inválido", async () => {
        expect(async () => {
            const pessoa = {
                email: "teste@email.com",
                cpf: "12312312312",
                nascimento: new Date("1997-08-18"),
                sexo: "invalido",
                nome: "Teste",
                naturalidade: "Recife",
                nacionalidade: "Brasil",
                endereco: {
                    bairro: "teste",
                    cep: "00000000",
                    cidade: "teste",
                    estado: "teste",
                    numero: 11,
                    rua: "teste",
                },
            };
            await createPessoaService.execute(pessoa as ICreatePessoaDTO);
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Não deve permitir criar uma nova Pessoa com um nome inválido", async () => {
        expect(async () => {
            const pessoa = {
                email: "teste@email.com",
                cpf: "12312312312",
                nascimento: new Date("1997-08-18"),
                sexo: "invalido",

                naturalidade: "Recife",
                nacionalidade: "Brasil",
                endereco: {
                    bairro: "teste",
                    cep: "00000000",
                    cidade: "teste",
                    estado: "teste",
                    numero: 11,
                    rua: "teste",
                },
            };
            await createPessoaService.execute(pessoa as ICreatePessoaDTO);
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Não deve permitir criar uma nova Pessoa com uma rua inválida", async () => {
        expect(async () => {
            const pessoa = {
                email: "teste@email.com",
                cpf: "12312312312",
                nascimento: new Date("1997-08-18"),
                sexo: "invalido",

                naturalidade: "Recife",
                nacionalidade: "Brasil",
                endereco: {
                    bairro: "teste",
                    cep: "00000000",
                    cidade: "teste",
                    estado: "teste",
                    numero: 11,
                },
            };
            await createPessoaService.execute(pessoa as ICreatePessoaDTO);
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Não deve permitir criar uma nova Pessoa com um estado inválido", async () => {
        expect(async () => {
            const pessoa = {
                email: "teste@email.com",
                cpf: "12312312312",
                nascimento: new Date("1997-08-18"),
                sexo: "invalido",

                naturalidade: "Recife",
                nacionalidade: "Brasil",
                endereco: {
                    bairro: "teste",
                    cep: "00000000",
                    cidade: "teste",
                    rua: "teste",
                    numero: 11,
                },
            };
            await createPessoaService.execute(pessoa as ICreatePessoaDTO);
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Não deve permitir criar uma nova Pessoa com um bairro inválid", async () => {
        expect(async () => {
            const pessoa = {
                email: "teste@email.com",
                cpf: "12312312312",
                nascimento: new Date("1997-08-18"),
                sexo: "invalido",

                naturalidade: "Recife",
                nacionalidade: "Brasil",
                endereco: {
                    rua: "teste",
                    cep: "00000000",
                    cidade: "teste",
                    estado: "teste",
                    numero: 11,
                },
            };
            await createPessoaService.execute(pessoa as ICreatePessoaDTO);
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Não deve permitir criar uma nova Pessoa com uma cidade inválida", async () => {
        expect(async () => {
            const pessoa = {
                email: "teste@email.com",
                cpf: "12312312312",
                nascimento: new Date("1997-08-18"),
                sexo: "invalido",

                naturalidade: "Recife",
                nacionalidade: "Brasil",
                endereco: {
                    bairro: "teste",
                    cep: "00000000",
                    rua: "teste",
                    estado: "teste",
                    numero: 11,
                },
            };
            await createPessoaService.execute(pessoa as ICreatePessoaDTO);
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Não deve permitir criar uma nova Pessoa com um numero inválido", async () => {
        expect(async () => {
            const pessoa = {
                email: "teste@email.com",
                cpf: "12312312312",
                nascimento: new Date("1997-08-18"),
                sexo: "invalido",

                naturalidade: "Recife",
                nacionalidade: "Brasil",
                endereco: {
                    bairro: "teste",
                    cep: "00000000",
                    cidade: "teste",
                    estado: "teste",
                    rua: "rua",
                },
            };
            await createPessoaService.execute(pessoa as ICreatePessoaDTO);
        }).rejects.toBeInstanceOf(AppError);
    });
    it("Não deve permitir criar uma nova Pessoa com um cep inválido", async () => {
        expect(async () => {
            const pessoa = {
                email: "teste@email.com",
                cpf: "12312312312",
                nascimento: new Date("1997-08-18"),
                sexo: "invalido",

                naturalidade: "Recife",
                nacionalidade: "Brasil",
                endereco: {
                    bairro: "teste",
                    cep: "invalido",
                    cidade: "teste",
                    estado: "teste",
                    rua: "rua",
                    numero: 11,
                },
            };
            await createPessoaService.execute(pessoa as ICreatePessoaDTO);
        }).rejects.toBeInstanceOf(AppError);
    });
});
