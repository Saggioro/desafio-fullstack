import FakeHashProvider from "@shared/container/providers/HashProvider/fakes/FakeHashProvider";
import AppError from "@shared/errors/AppError";

import FakeUsuariosRepository from "../repositories/fakes/FakeUsuariosRepository";
import AuthenticateUsuarioService from "./AuthenticateUsuarioService";

let fakeUsuariosRepository: FakeUsuariosRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUsuario: AuthenticateUsuarioService;

describe("Atenticação do usuário", () => {
    beforeEach(() => {
        fakeUsuariosRepository = new FakeUsuariosRepository();
        fakeHashProvider = new FakeHashProvider();

        authenticateUsuario = new AuthenticateUsuarioService(
            fakeUsuariosRepository,
            fakeHashProvider
        );
    });

    it("Deve autenticar o usuário", async () => {
        await fakeUsuariosRepository.create({
            login: "teste",
            senha: "123",
            ativo: true,
        });

        const response = await authenticateUsuario.execute({
            login: "teste",
            senha: "123",
        });

        expect(response).toHaveProperty("token");
    });

    it("Não deve autenticar com um usuário inexistente", async () => {
        await expect(
            authenticateUsuario.execute({
                login: "inexistente",
                senha: "123",
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it("Não deve autenticar com uma senha incorreta", async () => {
        await fakeUsuariosRepository.create({
            login: "teste",
            senha: "123123",
            ativo: true,
        });

        await expect(
            authenticateUsuario.execute({
                login: "teste",
                senha: "incorreta",
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it("Não deve autenticar com uma conta desativada", async () => {
        await fakeUsuariosRepository.create({
            login: "teste",
            senha: "123123",
            ativo: false,
        });

        await expect(
            authenticateUsuario.execute({
                login: "teste",
                senha: "123123",
            })
        ).rejects.toBeInstanceOf(AppError);
    });
});
