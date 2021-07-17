import authConfig from "@config/auth";
import { Response, Request, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import AppError from "@shared/errors/AppError";

export default function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
): void {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new AppError(
            [{ message: "Token JWT inválido", field: "Authorization" }],
            401
        );
    }

    const [, token] = authHeader.split(" ");

    try {
        verify(token, authConfig.jwt.secret);

        return next();
    } catch (err) {
        throw new AppError(
            [{ message: "Token JWT inválido", field: "Authorization" }],
            401
        );
    }
}
