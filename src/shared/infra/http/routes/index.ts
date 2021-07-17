import pessoasRouter from "@modules/pessoas/infra/http/routes/pessoas.routes";
import sessionsUsuarioRouter from "@modules/usuarios/infra/http/routes/sessionsUsuario.routes";
import usuariosRouter from "@modules/usuarios/infra/http/routes/usuarios.routes";
import { Router, Request, Response } from "express";

const routes = Router();

routes.use("/sessionsUsuario", sessionsUsuarioRouter);
routes.use("/usuarios", usuariosRouter);
routes.use("/pessoas", pessoasRouter);

routes.get("/", (request: Request, response: Response) => {
    return response.json({ message: "OK!" });
});

export default routes;
