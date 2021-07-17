import "reflect-metadata";
import "dotenv/config";
import "express-async-errors";
import cors from "cors";
import express from "express";

import routes from "./routes";
import "@shared/infra/typeorm";
import "@shared/container";

const app = express();

app.use(express.json());
app.use(cors());

app.use(routes);

export { app };
