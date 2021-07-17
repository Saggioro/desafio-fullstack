import { Router } from "express";

import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";

import PessoaController from "../controllers/PessoaController";

const pessoasRouter = Router();

const pessoaController = new PessoaController();

pessoasRouter.post("/", ensureAuthenticated, pessoaController.create);

export default pessoasRouter;
