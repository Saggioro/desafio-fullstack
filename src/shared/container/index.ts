import UsuariosRepository from "@modules/usuarios/infra/typeorm/repositories/UsuariosRepository";
import IUsuariosRepository from "@modules/usuarios/repositories/IUsuariosRepository";
import { container } from "tsyringe";

container.registerSingleton<IUsuariosRepository>(
    "UsuariosRepository",
    UsuariosRepository
);
