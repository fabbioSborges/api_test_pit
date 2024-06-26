import { Request, Response } from "express";
import { ValidarUseUseCase } from "./ValidaUserUseCase";

export class ValidaUserController {
  async handle(req: Request, res: Response) {
    try {
      const getUserUseCase = new ValidarUseUseCase();
      const result = await getUserUseCase.execute(req.body.phone, req.body.cpf);
      return res.json( result );
    } catch (e: any) {
      return res.status(500).json({
        errorMessage: e.message,
        error_object: e
      });
    }
  }
}