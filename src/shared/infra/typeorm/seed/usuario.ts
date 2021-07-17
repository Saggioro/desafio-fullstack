import { hash } from "bcrypt";
import { v4 } from "uuid";

import createConnection from "../index";

async function create() {
    const connection = await createConnection();

    const senha = await hash("stefanini123", 8);

    await connection.query(`
        INSERT INTO usuarios(id, login, senha, ativo, created_at)
         values('${v4()}', 'stefanini', '${senha}', true, 'now()')
    `);

    await connection.close();
}

create().then(() => {
    console.log("Usuário criado!");
});
