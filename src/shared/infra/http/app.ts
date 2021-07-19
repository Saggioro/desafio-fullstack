import "reflect-metadata";
import "dotenv/config";
import "express-async-errors";
import cors from "cors";
import express, { Request, Response, NextFunction } from "express";

import createConnection from "@shared/infra/typeorm";

import AppError from "../../errors/AppError";
import routes from "./routes";
import "@shared/container";

createConnection();
const app = express();

app.use(express.json());
app.use(cors());

app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
        return response
            .status(err.statusCode)
            .json({ status: "error", errors: err.messages });
    }

    console.error(err);

    return response.status(500).json({
        status: "error",
        errors: [{ message: "Erro interno do servidor" }],
    });
});

export { app };
