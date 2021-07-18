import ICreateEnderecoDTO from "./ICreateEnderecoDTO";

export default interface ICreatePessoaDTO {
    nome: string;
    sexo?: "Feminino" | "Masculino";
    nascimento: Date;
    naturalidade?: string;
    nacionalidade?: string;
    cpf: string;
    email?: string;
    endereco: ICreateEnderecoDTO;
}
