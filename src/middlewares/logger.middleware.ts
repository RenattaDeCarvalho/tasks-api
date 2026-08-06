import { Request, Response, NextFunction } from "express";

export function loggerMiddleware(
    req: Request,
    _res: Response,
    next: NextFunction
): void {
    const timestamp = new Date().toISOString();

    // req.method - retorna o método HTTP da requisição (GET, POST, PUT, DELETE, etc.)
    // req.originalUrl - retorna a URL original da requisição ( /tasks/1 ou /tasks?status=pending etc.)
    console.log(`${req.method} ${req.originalUrl} - ${timestamp}`);

    // Chamamos o próximo middleware ou continuar para o próximo passo do fluxo.
    next();
}