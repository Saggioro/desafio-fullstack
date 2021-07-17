import { Router } from "express";

import PessoaController from "../controllers/PessoaController";

const pessoasRouter = Router();

const pessoaController = new PessoaController();

pessoasRouter.post("/", pessoaController.create);

export default pessoasRouter;
