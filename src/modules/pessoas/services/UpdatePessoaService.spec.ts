import DatefnsProvider from "@shared/container/providers/DateProvider/implementations/DatefnsProvider";
import IDateProvider from "@shared/container/providers/DateProvider/models/IDateProvider";
import AppError from "@shared/errors/AppError";

import FakePessoasRepository from "../repositories/fakes/FakePessoasRepository";
import UpdatePessoaService from "./UpdatePessoaService";

let updatePessoaService: UpdatePessoaService;
let fakePessoasRepository: FakePessoasRepository;
let dateProvider: IDateProvider;
describe("Atualizar pessoa", () => {
    beforeEach(() => {
        fakePessoasRepository = new FakePessoasRepository();
        dateProvider = new DatefnsProvider();
        updatePessoaService = new UpdatePessoaService(
            fakePessoasRepository,
            dateProvider
        );
    });
    it("Deve permitir atualizar uma Pessoa", async () => {
        const pessoa = await fakePessoasRepository.create({
            email: "teste@email.com",
            cpf: "12312312312",
            nascimento: new Date("1997-08-18"),
            sexo: "Masculino",
            nome: "Teste",
            naturalidade: "Recife",
            nacionalidade: "Brasilia",
        });

        pessoa.cpf = "32132132112";
        pessoa.email = "teste2@email.com";
        pessoa.nome = "teste2@email.com";
        pessoa.nacionalidade = "teste2@email.com";
        pessoa.sexo = "Feminino";

        const pessoaAtualizada = await updatePessoaService.execute(pessoa);

        expect(pessoaAtualizada.cpf).toBe("32132132112");
    });

    it("Não deve permitir atualizar uma nova Pessoa com um cpf já existente", async () => {
        expect(async () => {
            await fakePessoasRepository.create({
                email: "teste@email.com",
                cpf: "12312312312",
                nascimento: new Date("1997-08-18"),
                sexo: "Masculino",
                nome: "Teste",
                naturalidade: "Recife",
                nacionalidade: "Brasilia",
            });

            const pessoa = await fakePessoasRepository.create({
                email: "teste2@email.com",
                cpf: "32132132112",
                nascimento: new Date("1997-08-18"),
                sexo: "Masculino",
                nome: "Teste",
                naturalidade: "Recife",
                nacionalidade: "Brasilia",
            });

            pessoa.cpf = "12312312312";

            await updatePessoaService.execute(pessoa);
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Não deve permitir atualizar uma nova Pessoa com um email já existente", async () => {
        expect(async () => {
            await fakePessoasRepository.create({
                email: "teste@email.com",
                cpf: "12312312312",
                nascimento: new Date("1997-08-18"),
                sexo: "Masculino",
                nome: "Teste",
                naturalidade: "Recife",
                nacionalidade: "Brasilia",
            });

            const pessoa = await fakePessoasRepository.create({
                email: "teste2@email.com",
                cpf: "32132132112",
                nascimento: new Date("1997-08-18"),
                sexo: "Masculino",
                nome: "Teste",
                naturalidade: "Recife",
                nacionalidade: "Brasilia",
            });

            pessoa.email = "teste@email.com";

            await updatePessoaService.execute(pessoa);
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Não deve permitir atualizar uma nova Pessoa com um sexo inválido", async () => {
        expect(async () => {
            const pessoa = await fakePessoasRepository.create({
                email: "teste2@email.com",
                cpf: "32132132112",
                nascimento: new Date("1997-08-18"),
                sexo: "Masculino",
                nome: "Teste",
                naturalidade: "Recife",
                nacionalidade: "Brasilia",
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
                cpf: "32132132112",
                nascimento: new Date("1997-08-18"),
                sexo: "Masculino",
                nome: "Teste",
                naturalidade: "Recife",
                nacionalidade: "Brasilia",
            });

            pessoa.email = "invalido";
            await updatePessoaService.execute(pessoa);
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Não deve permitir atualizar uma nova Pessoa com uma data de nascimento inválida", async () => {
        expect(async () => {
            const pessoa = await fakePessoasRepository.create({
                email: "teste2@email.com",
                cpf: "32132132112",
                nascimento: new Date("1997-08-18"),
                sexo: "Masculino",
                nome: "Teste",
                naturalidade: "Recife",
                nacionalidade: "Brasilia",
            });

            pessoa.nascimento = new Date("invalido");
            await updatePessoaService.execute(pessoa);
        }).rejects.toBeInstanceOf(AppError);
    });
});
