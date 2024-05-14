import { NextFunction, Request, Response } from 'express';

export function LoggerMiddleware(
    req: Request, res: Response, next: NextFunction
  ) {
    const actualDate = new Date();
    const date = actualDate.toLocaleDateString();
    const time = actualDate.toLocaleTimeString();
    console.log(`Ejecutando middleware: Ruta ${req.url}, Metodo ${req.method}, Fecha y hora ${date} ${ time}`);
      next();
  }