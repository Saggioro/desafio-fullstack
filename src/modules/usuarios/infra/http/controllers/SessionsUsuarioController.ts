import { Request, Response } from "express";
import { container } from "tsyringe";

import AuthenticateUsuarioService from "../../../services/AuthenticateUsuarioService";

export default class SessionsUsuarioController {
    public async create(
        request: Request,
        response: Response
    ): Promise<Response> {
        const { login, senha } = request.body;

        const authenticateUsuarioService = container.resolve(
            AuthenticateUsuarioService
        );

        const { token } = await authenticateUsuarioService.execute({
            login,
            senha,
        });

        return response.json({ token });
    }
}
