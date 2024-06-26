import { Request, Response } from "express";
import { ListAnswersUserUseCase } from "./ListAnswersUserUseCase";

export class ListAnswersUserController {
  async handle(req: Request, res: Response) {
    try {
      const listAnswersUserUseCase = new ListAnswersUserUseCase();
      const result = await listAnswersUserUseCase.execute(req.params.phone);
      return res.json({ result });
    } catch (e: any) {
      return res.status(500).json({
        errorMessage: e.message,
        error_object: e
      });
    }
  }
}