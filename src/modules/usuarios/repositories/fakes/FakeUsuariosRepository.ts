import ICreateUsuarioDTO from "@modules/usuarios/dtos/ICreateUsuarioDTO";
import Usuario from "@modules/usuarios/infra/typeorm/entities/Usuario";
import IUsuariosRepository from "@modules/usuarios/repositories/IUsuariosRepository";
import { v4 } from "uuid";

class FakeUsuariosRepository implements IUsuariosRepository {
    private ormRepository: Usuario[];

    constructor() {
        this.ormRepository = [];
    }

    public async create({
        ativo,
        login,
        senha,
    }: ICreateUsuarioDTO): Promise<Usuario> {
        const usuario = new Usuario();

        Object.assign(usuario, {
            id: v4(),
            ativo,
            login,
            senha,
        });

        this.ormRepository.push(usuario);

        return usuario;
    }

    public async allActive(): Promise<Usuario[]> {
        const usuarios = await this.ormRepository.filter(
            (usuario) => usuario.ativo === true
        );
        return usuarios;
    }

    public async all(): Promise<Usuario[]> {
        return this.ormRepository;
    }

    public async findById(id: string): Promise<Usuario | undefined> {
        return this.ormRepository.find((usuario) => usuario.id === id);
    }

    public async findByLogin(login: string): Promise<Usuario | undefined> {
        return this.ormRepository.find((usuario) => usuario.login === login);
    }

    public async save(data: Usuario): Promise<Usuario> {
        const indexUsuario = this.ormRepository.findIndex(
            (usuario) => usuario.id === data.id
        );

        this.ormRepository[indexUsuario] = data;

        return data;
    }
}

export default FakeUsuariosRepository;
