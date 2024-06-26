import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
  async handle(req: Request, res: Response) {
    try {
      const createUsertUseCase = new CreateUserUseCase();
      const result = await createUsertUseCase.execute(req.body);
      return res.json({ result });
    } catch (e: any) {
      if (e.message === "Usuário já existe") {
        return res.status(400).json({
          errorMessage: e.message,
        });
      }
      return res.status(500).json({
        errorMessage: e.message,
        error_object: e
      });
    }
  }
}