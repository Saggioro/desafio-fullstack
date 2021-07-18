import BrazilianValuesProvider from "@shared/container/providers/BrazilValuesProvider/implementations/BrazilianValuesProvider";
import IBrazilValuesProvider from "@shared/container/providers/BrazilValuesProvider/models/IBrazilValuesProvider";
import DatefnsProvider from "@shared/container/providers/DateProvider/implementations/DatefnsProvider";
import IDateProvider from "@shared/container/providers/DateProvider/models/IDateProvider";
import AppError from "@shared/errors/AppError";

import FakePessoasRepository from "../repositories/fakes/FakePessoasRepository";
import UpdatePessoaService from "./UpdatePessoaService";

let updatePessoaService: UpdatePessoaService;
let fakePessoasRepository: FakePessoasRepository;
let dateProvider: IDateProvider;
let brazilValuesProvider: IBrazilValuesProvider;

describe("Atualizar pessoa", () => {
    beforeEach(() => {
        fakePessoasRepository = new FakePessoasRepository();
        dateProvider = new DatefnsProvider();
        brazilValuesProvider = new BrazilianValuesProvider();
        updatePessoaService = new UpdatePessoaService(
            fakePessoasRepository,
            dateProvider,
            brazilValuesProvider
        );
    });
    it("Deve permitir atualizar uma Pessoa", async () => {
        const pessoa = await fakePessoasRepository.create({
            email: "teste@email.com",
            cpf: "10297759400",
            nascimento: new Date("1997-08-18"),
            sexo: "Masculino",
            nome: "Teste",
            naturalidade: "Recife",
            nacionalidade: "Brasilia",
            endereco: {
                bairro: "teste",
                cep: "000000000",
                cidade: "teste",
                estado: "teste",
                numero: 11,
                rua: "teste",
            },
        });

        pessoa.email = "teste2@email.com";
        pessoa.nome = "teste2@email.com";
        pessoa.nacionalidade = "teste2@email.com";
        pessoa.sexo = "Feminino";

        const pessoaAtualizada = await updatePessoaService.execute(pessoa);

        expect(pessoaAtualizada.email).toBe("teste2@email.com");
    });

    it("Não deve permitir atualizar uma nova Pessoa com um cpf já existente", async () => {
        expect(async () => {
            await fakePessoasRepository.create({
                email: "teste@email.com",
                cpf: "10297759400",
                nascimento: new Date("1997-08-18"),
                sexo: "Masculino",
                nome: "Teste",
                naturalidade: "Recife",
                nacionalidade: "Brasilia",
                endereco: {
                    bairro: "teste",
                    cep: "000000000",
                    cidade: "teste",
                    estado: "teste",
                    numero: 11,
                    rua: "teste",
                },
            });

            const pessoa = await fakePessoasRepository.create({
                email: "teste2@email.com",
                cpf: "32132132112",
                nascimento: new Date("1997-08-18"),
                sexo: "Masculino",
                nome: "Teste",
                naturalidade: "Recife",
                nacionalidade: "Brasilia",
                endereco: {
                    bairro: "teste",
                    cep: "000000000",
                    cidade: "teste",
                    estado: "teste",
                    numero: 11,
                    rua: "teste",
                },
            });

            pessoa.cpf = "10297759400";

            await updatePessoaService.execute(pessoa);
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Não deve permitir atualizar uma nova Pessoa com um email já existente", async () => {
        expect(async () => {
            await fakePessoasRepository.create({
                email: "teste@email.com",
                cpf: "10297759400",
                nascimento: new Date("1997-08-18"),
                sexo: "Masculino",
                nome: "Teste",
                naturalidade: "Recife",
                nacionalidade: "Brasilia",
                endereco: {
                    bairro: "teste",
                    cep: "000000000",
                    cidade: "teste",
                    estado: "teste",
                    numero: 11,
                    rua: "teste",
                },
            });

            const pessoa = await fakePessoasRepository.create({
                email: "teste2@email.com",
                cpf: "15585403427",
                nascimento: new Date("1997-08-18"),
                sexo: "Masculino",
                nome: "Teste",
                naturalidade: "Recife",
                nacionalidade: "Brasilia",
                endereco: {
                    bairro: "teste",
                    cep: "000000000",
                    cidade: "teste",
                    estado: "teste",
                    numero: 11,
                    rua: "teste",
                },
            });

            pessoa.email = "teste@email.com";

            await updatePessoaService.execute(pessoa);
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Não deve permitir atualizar uma nova Pessoa com um sexo inválido", async () => {
        expect(async () => {
            const pessoa = await fakePessoasRepository.create({
                email: "teste2@email.com",
                cpf: "15585403427",
                nascimento: new Date("1997-08-18"),
                sexo: "Masculino",
                nome: "Teste",
                naturalidade: "Recife",
                nacionalidade: "Brasilia",
                endereco: {
                    bairro: "teste",
                    cep: "000000000",
                    cidade: "teste",
                    estado: "teste",
                    numero: 11,
                    rua: "teste",
                },
            });

            const pessoaAlterada = { ...pessoa };
            pessoaAlterada.sexo = "invalido" as "Masculino";
            await updatePessoaService.execute(pessoaAlterada);
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Não deve permitir atualizar uma nova Pessoa com um email inválido", async () => {
        expect(async () => {
            const pessoa = await fakePessoasRepository.create({
                email: "teste2@email.com",
                cpf: "15585403427",
                nascimento: new Date("1997-08-18"),
                sexo: "Masculino",
                nome: "Teste",
                naturalidade: "Recife",
                nacionalidade: "Brasilia",
                endereco: {
                    bairro: "teste",
                    cep: "000000000",
                    cidade: "teste",
                    estado: "teste",
                    numero: 11,
                    rua: "teste",
                },
            });

            pessoa.email = "invalido";
            await updatePessoaService.execute(pessoa);
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Não deve permitir atualizar uma nova Pessoa com uma data de nascimento inválida", async () => {
        expect(async () => {
            const pessoa = await fakePessoasRepository.create({
                email: "teste2@email.com",
                cpf: "15585403427",
                nascimento: new Date("1997-08-18"),
                sexo: "Masculino",
                nome: "Teste",
                naturalidade: "Recife",
                nacionalidade: "Brasilia",
                endereco: {
                    bairro: "teste",
                    cep: "000000000",
                    cidade: "teste",
                    estado: "teste",
                    numero: 11,
                    rua: "teste",
                },
            });

            pessoa.nascimento = new Date("invalido");
            await updatePessoaService.execute(pessoa);
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Não deve permitir atualizar uma nova Pessoa com um nome inválido", async () => {
        expect(async () => {
            const pessoa = await fakePessoasRepository.create({
                email: "teste2@email.com",
                cpf: "15585403427",
                nascimento: new Date("1997-08-18"),
                sexo: "Masculino",
                nome: "Teste",
                naturalidade: "Recife",
                nacionalidade: "Brasilia",
                endereco: {
                    bairro: "teste",
                    cep: "000000000",
                    cidade: "teste",
                    estado: "teste",
                    numero: 11,
                    rua: "teste",
                },
            });

            pessoa.nome = "";
            await updatePessoaService.execute(pessoa);
        }).rejects.toBeInstanceOf(AppError);
    });
});
