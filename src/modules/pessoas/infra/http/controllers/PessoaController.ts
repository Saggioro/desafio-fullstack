import { Request, Response } from "express";
import { container } from "tsyringe";

import CreatePessoaService from "../../../services/CreatePessoaService";

export default class PessoaController {
    public async create(
        request: Request,
        response: Response
    ): Promise<Response> {
        const {
            nascimento,
            naturalidade,
            nome,
            sexo,
            nacionalidade,
            email,
            cpf,
        } = request.body;

        const createPessoaService = container.resolve(CreatePessoaService);

        const pessoa = await createPessoaService.execute({
            nascimento,
            naturalidade,
            nome,
            sexo,
            nacionalidade,
            email,
            cpf,
        });

        return response.status(201).json(pessoa);
    }
}
