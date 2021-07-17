import ICreateUsuarioDTO from "@modules/usuarios/dtos/ICreateUsuarioDTO";
import IUsuariosRepository from "@modules/usuarios/repositories/IUsuariosRepository";
import { getRepository, Repository } from "typeorm";

import Usuario from "../entities/Usuario";

class UsuariosRepository implements IUsuariosRepository {
    private ormRepository: Repository<Usuario>;

    constructor() {
        this.ormRepository = getRepository(Usuario);
    }

    public async create(data: ICreateUsuarioDTO): Promise<Usuario> {
        const Usuario = this.ormRepository.create(data);
        await this.ormRepository.save(Usuario);
        return Usuario;
    }

    public async allActive(): Promise<Usuario[]> {
        const Usuarios = await this.ormRepository.find({ ativo: true });
        return Usuarios;
    }

    public async all(): Promise<Usuario[]> {
        const Usuarios = await this.ormRepository.find();
        return Usuarios;
    }

    public async findById(id: string): Promise<Usuario | undefined> {
        const Usuario = await this.ormRepository.findOne({ where: { id } });
        return Usuario;
    }

    public async findByLogin(login: string): Promise<Usuario | undefined> {
        const Usuario = await this.ormRepository.findOne({ where: { login } });
        return Usuario;
    }

    public async save(Usuario: Usuario): Promise<Usuario> {
        return this.ormRepository.save(Usuario);
    }
}

export default UsuariosRepository;
