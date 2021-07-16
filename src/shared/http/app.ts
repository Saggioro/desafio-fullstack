import "reflect-metadata";
import "dotenv/config";
import "express-async-errors";
import cors from "cors";
import express from "express";

const app = express();

app.use(cors());

export { app };
