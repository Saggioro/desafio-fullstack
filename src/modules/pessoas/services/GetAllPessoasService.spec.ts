import FakePessoasRepository from "../repositories/fakes/FakePessoasRepository";
import GetAllPessoasService from "./GetAllPessoasService";

let getAllPessoasService: GetAllPessoasService;
let fakePessoasRepository: FakePessoasRepository;
describe("Buscar pessoa pelo ID", () => {
    beforeEach(() => {
        fakePessoasRepository = new FakePessoasRepository();

        getAllPessoasService = new GetAllPessoasService(fakePessoasRepository);
    });
    it("Deve permitir buscar todas as Pessoas", async () => {
        const pessoa1 = await fakePessoasRepository.create({
            email: "teste@email.com",
            cpf: "12312312312",
            nascimento: new Date("1997-08-18"),
            sexo: "Masculino",
            nome: "Teste",
            naturalidade: "Recife",
            nacionalidade: "Brasilia",
        });

        const pessoa2 = await fakePessoasRepository.create({
            email: "teste@email.com",
            cpf: "12312312312",
            nascimento: new Date("1997-08-18"),
            sexo: "Masculino",
            nome: "Teste",
            naturalidade: "Recife",
            nacionalidade: "Brasilia",
        });

        const pessoas = await getAllPessoasService.execute();

        expect(pessoas[0].id).toBe(pessoa1.id);
        expect(pessoas[1].id).toBe(pessoa2.id);
    });
});
