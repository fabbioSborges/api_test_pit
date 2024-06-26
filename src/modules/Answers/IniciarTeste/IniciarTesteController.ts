import { Request, Response } from "express";
import { IniciarTesteUseCase } from "./IniciarTesteUseCase";

export class IniciarTesteController {
  async handle(req: Request, res: Response) {
    try {
      const iniciarTesteUseCase = new IniciarTesteUseCase();
      const result = await iniciarTesteUseCase.execute(req.params.phone);
      return res.json({ result });
    } catch (e: any) {
      
      return res.status(500).json({
        errorMessage: e.message,
        error_object: e
      });
    }
  }
}