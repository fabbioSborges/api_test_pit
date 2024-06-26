import { Request, Response } from "express";
import { GetUserUseCase } from "./GetUserUseCase";

export class GetUserController {
  async handle(req: Request, res: Response) {
    try {
      const getUserUseCase = new GetUserUseCase();
      const result = await getUserUseCase.execute(req.params.id);
      return res.json({ result });
    } catch (e: any) {
      return res.status(500).json({
        errorMessage: e.message,
        error_object: e
      });
    }
  }
}