import { app } from "./app";

app.listen(process.env.PORT || 3333, () => {
    const porta = process.env.PORT || 3333;
    console.log(`Servidor iniciado na porta ${porta}`);
});
