import { Request, Response } from "express";

export default class UsuarioController {
    public async create(
        request: Request,
        response: Response
    ): Promise<Response> {
        const { login, senha, ativo } = request.body;

        return response.json({ message: "ok" });
    }
}
