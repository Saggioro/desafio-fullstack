import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateUsuarioService from "../../../services/CreateUsuarioService";

export default class UsuarioController {
    public async create(
        request: Request,
        response: Response
    ): Promise<Response> {
        const { login, senha, ativo } = request.body;

        const createUsuarioService = container.resolve(CreateUsuarioService);

        await createUsuarioService.execute({ login, senha, ativo });

        return response.status(201).send();
    }
}
