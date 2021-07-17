import PessoasRepository from "@modules/pessoas/infra/typeorm/repositories/PessoasRepository";
import IPessoasRepository from "@modules/pessoas/repositories/IPessoasRepository";
import UsuariosRepository from "@modules/usuarios/infra/typeorm/repositories/UsuariosRepository";
import IUsuariosRepository from "@modules/usuarios/repositories/IUsuariosRepository";
import { container } from "tsyringe";

import "./providers";

container.registerSingleton<IUsuariosRepository>(
    "UsuariosRepository",
    UsuariosRepository
);

container.registerSingleton<IPessoasRepository>(
    "PessoasRepository",
    PessoasRepository
);
