import { inject, injectable } from "tsyringe";

import IHashProvider from "@shared/container/providers/HashProvider/models/IHashProvider";
import AppError, { IMessages } from "@shared/errors/AppError";

import IUsuariosRepository from "../repositories/IUsuariosRepository";

interface IRequest {
    login: string;
    senha: string;
    ativo: boolean;
}

@injectable()
class CreateUsuarioService {
    constructor(
        @inject("UsuariosRepository")
        private usuariosRepository: IUsuariosRepository,

        @inject("HashProvider")
        private hashProvider: IHashProvider
    ) {}

    public async execute({ login, senha, ativo }: IRequest): Promise<void> {
        const errors: IMessages[] = [];
        const sameLogin = await this.usuariosRepository.findByLogin(login);

        if (sameLogin) {
            errors.push({
                message: "O login enviado já está sendo utilizado",
                field: "login",
            });
        }

        if (errors.length > 0) {
            throw new AppError(errors, 400);
        }

        const senhaCriptografada = await this.hashProvider.generateHash(senha);

        await this.usuariosRepository.create({
            login,
            ativo,
            senha: senhaCriptografada,
        });
    }
}
export default CreateUsuarioService;
