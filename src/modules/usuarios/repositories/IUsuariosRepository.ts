import ICreateUsuarioDTO from "../dtos/ICreateUsuarioDTO";
import Usuario from "../infra/typeorm/entities/Usuario";

export default interface IUsuariosRepository {
    findById(id: string): Promise<Usuario | undefined>;
    findByLogin(login: string): Promise<Usuario | undefined>;
    create(data: ICreateUsuarioDTO): Promise<Usuario>;
    save(Usuario: Usuario): Promise<Usuario>;
    allActive(): Promise<Usuario[]>;
    all(): Promise<Usuario[]>;
}
