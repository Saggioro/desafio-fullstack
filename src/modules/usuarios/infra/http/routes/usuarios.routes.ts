import { Router } from "express";

import UsuarioController from "../controllers/UsuarioController";

const usuariosRouter = Router();

const usuarioController = new UsuarioController();

usuariosRouter.post("/", usuarioController.create);

export default usuariosRouter;
