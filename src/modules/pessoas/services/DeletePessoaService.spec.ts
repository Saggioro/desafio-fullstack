import AppError from "@shared/errors/AppError";

import FakePessoasRepository from "../repositories/fakes/FakePessoasRepository";
import DeletePessoaService from "./DeletePessoaService";

let deletePessoaService: DeletePessoaService;
let fakePessoasRepository: FakePessoasRepository;
describe("Deletar pessoa", () => {
    beforeEach(() => {
        fakePessoasRepository = new FakePessoasRepository();

        deletePessoaService = new DeletePessoaService(fakePessoasRepository);
    });
    it("Deve permitir deletar uma Pessoa", async () => {
        const pessoa = await fakePessoasRepository.create({
            email: "teste@email.com",
            cpf: "12312312312",
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

        await deletePessoaService.execute(pessoa.id);

        const pessoaDeletada = await fakePessoasRepository.findById(pessoa.id);

        expect(pessoaDeletada).toBe(undefined);
    });

    it("Não deve permitir deletar uma Pessoa inexistente", async () => {
        expect(async () => {
            await deletePessoaService.execute("inexistente");
        }).rejects.toBeInstanceOf(AppError);
    });
});
