import authConfig from "@config/auth";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import IHashProvider from "@shared/container/providers/HashProvider/models/IHashProvider";
import AppError from "@shared/errors/AppError";

import Usuario from "../infra/typeorm/entities/Usuario";
import IUsuariosRepository from "../repositories/IUsuariosRepository";

interface IRequest {
    login: string;
    senha: string;
}
interface IResponse {
    token: string;
}

@injectable()
class AuthenticateUsuarioService {
    constructor(
        @inject("UsuariosRepository")
        private usuariosRepository: IUsuariosRepository,

        @inject("HashProvider")
        private hashProvider: IHashProvider
    ) {}

    public async execute({ login, senha }: IRequest): Promise<IResponse> {
        const usuario = await this.usuariosRepository.findByLogin(login);

        if (!usuario) {
            throw new AppError("Login ou senha incorreta");
        }

        const senhaCorreta = await this.hashProvider.compareHash(
            senha,
            usuario.senha
        );

        if (!senhaCorreta) {
            throw new AppError("Login ou senha incorreta.");
        }

        if (!usuario.ativo) {
            throw new AppError(
                "Conta desativada. Entre em contato com o seu supervisor."
            );
        }

        const token = sign({}, authConfig.jwt.secret, {
            subject: usuario.id,
            expiresIn: authConfig.jwt.expiresIn,
        });

        return {
            token,
        };
    }
}
export default AuthenticateUsuarioService;
