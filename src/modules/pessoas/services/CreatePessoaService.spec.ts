import DatefnsProvider from "@shared/container/providers/DateProvider/implementations/DatefnsProvider";
import IDateProvider from "@shared/container/providers/DateProvider/models/IDateProvider";
import AppError from "@shared/errors/AppError";

import ICreatePessoaDTO from "../dtos/ICreatePessoaDTO";
import FakePessoasRepository from "../repositories/fakes/FakePessoasRepository";
import CreatePessoaService from "./CreatePessoaService";

let createPessoaService: CreatePessoaService;
let fakePessoasRepository: FakePessoasRepository;
let dateProvider: IDateProvider;
describe("Criar pessoa", () => {
    beforeEach(() => {
        fakePessoasRepository = new FakePessoasRepository();
        dateProvider = new DatefnsProvider();
        createPessoaService = new CreatePessoaService(
            fakePessoasRepository,
            dateProvider
        );
    });

    it("Deve permitir criar uma nova Pessoa", async () => {
        await createPessoaService.execute({
            email: "teste@email.com",
            cpf: "12312312312",
            nascimento: new Date("1997-08-18"),
            sexo: "Masculino",
            nome: "Teste",
            naturalidade: "Recife",
            nacionalidade: "Brasil",
        });

        const pessoa = await fakePessoasRepository.findByCpf("12312312312");

        expect(pessoa).toHaveProperty("id");
    });
    it("Não deve permitir criar uma nova Pessoa com o mesmo cpf", async () => {
        expect(async () => {
            const pessoa: ICreatePessoaDTO = {
                email: "teste@email.com",
                cpf: "12312312312",
                nascimento: new Date("1997-08-18"),
                sexo: "Masculino",
                nome: "Teste",
                naturalidade: "Recife",
                nacionalidade: "Brasil",
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
                cpf: "12312312312",
                nascimento: new Date("1997-08-18"),
                sexo: "Masculino",
                nome: "Teste",
                naturalidade: "Recife",
                nacionalidade: "Brasil",
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
            };
            await createPessoaService.execute(pessoa as ICreatePessoaDTO);
        }).rejects.toBeInstanceOf(AppError);
    });
});
