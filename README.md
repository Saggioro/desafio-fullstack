

## :bulb: Introdução 

Este projeto é uma desafia para vaga FullStack na Stefanini

## :house: Iniciando o projeto

1. Clone este repositório usando: `https://github.com/Saggioro/desafio-fullstack.git`
2. Instale os pacotes usando seu gerenciador ( yarn install ou npm install )
3. Inicie um banco(postgres de preferência) e altere o arquivo ormconfig com as configurações do seu banco
4. Execute 'yarn typeorm migration:run' para gerar as tabelas no seu banco de dados
5. Execute 'yarn seed' para inserir um usuário no banco com login "stefanini" e senha "stefanini123"
6. Execute 'yarn dev' para iniciar o servidor

## :tada: Endpoints

Endpoints do servidor

- GET /pessoas - Busca todas as pessoas no banco.

- GET /pessoas/:id - Busca uma pessoa no BD pelo id.

- DELETE /pessoas/:id - Deleta uma pessoa no BD pelo id.

- POST /pessoas - Isere uma pessoa no BD.
    nome: string;
    sexo?: "Feminino" | "Masculino";
    nascimento: Date;
    naturalidade?: string;
    nacionalidade?: string;
    cpf: string;
    email?: string;

- PUT /pessoas - Atualiza uma pessoa no BD.
    id:string;
    nome: string;
    sexo?: "Feminino" | "Masculino";
    nascimento: Date;
    naturalidade?: string;
    nacionalidade?: string;
    cpf: string;
    email?: string;
    
VERSAO 2
  Versão 2 recebe endereço obrigatório como diferencial sem afetar a funcionalidade da primeira versão

- POST /pessoas - Isere uma pessoa no BD.
    nome: string;
    sexo?: "Feminino" | "Masculino";
    nascimento: Date;
    naturalidade?: string;
    nacionalidade?: string;
    cpf: string;
    email?: string;
    endereco: {
      rua: string;
      numero: number;
      bairro: string;
      cidade: string;
      cep: string;
      estado: string;
    }

- PUT /pessoas - Atualiza uma pessoa no BD.
    id:string;
    nome: string;
    sexo?: "Feminino" | "Masculino";
    nascimento: Date;
    naturalidade?: string;
    nacionalidade?: string;
    cpf: string;
    email?: string;
    endereco: {
      rua: string;
      numero: number;
      bairro: string;
      cidade: string;
      cep: string;
      estado: string;
    }

## :zap: Comandos
- `yarn dev` - inicia o servidor de desenvolvimento com o hot-reload ativado `http://localhost:3333`
- `yarn start` - inicia o servidor apontando para a pasta de build 'dist' `http://localhost:3333`
- `yarn build` - Gera uma build
- `yarn test` - executa os testes e gera um coverage da aplicação

