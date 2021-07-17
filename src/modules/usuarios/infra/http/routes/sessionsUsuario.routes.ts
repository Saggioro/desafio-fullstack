import { Router } from "express";

import SessionsUsuarioController from "../controllers/SessionsUsuarioController";

const sessionsUsuarioRouter = Router();
const sessionsUsuarioController = new SessionsUsuarioController();

sessionsUsuarioRouter.post("/", sessionsUsuarioController.create);

export default sessionsUsuarioRouter;
