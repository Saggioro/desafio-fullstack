import { Router } from "express";

import ensureAuthenticated from "@shared/infra/http/middlewares/ensureAuthenticated";

import PessoaController from "../controllers/PessoaController";

const pessoasRouter = Router();

const pessoaController = new PessoaController();

pessoasRouter.post("/", ensureAuthenticated, pessoaController.create);
pessoasRouter.put("/", ensureAuthenticated, pessoaController.update);
pessoasRouter.delete("/:id", ensureAuthenticated, pessoaController.delete);
pessoasRouter.get("/:id", ensureAuthenticated, pessoaController.show);
pessoasRouter.get("/", ensureAuthenticated, pessoaController.index);

export default pessoasRouter;
