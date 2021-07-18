import DeletePessoaService from "@modules/pessoas/services/DeletePessoaService";
import UpdatePessoaService from "@modules/pessoas/services/UpdatePessoaService";
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

    public async update(
        request: Request,
        response: Response
    ): Promise<Response> {
        const data = request.body;

        const updatePessoaService = container.resolve(UpdatePessoaService);

        const pessoa = await updatePessoaService.execute(data);

        return response.json(pessoa);
    }

    public async delete(
        request: Request,
        response: Response
    ): Promise<Response> {
        const { id } = request.params;

        const deletePessoaService = container.resolve(DeletePessoaService);

        await deletePessoaService.execute(id);

        return response.status(200).send();
    }
}
