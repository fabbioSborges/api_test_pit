import { Request, Response } from "express";
import { CreateQuestionUseCase } from "./CreateQuestionUseCase";

export class CreateQuestionController {
  async handle(req: Request, res: Response) {
    try {
      const createQuestionUseCase = new CreateQuestionUseCase();
      const result = await createQuestionUseCase.execute(req.body);
      return res.json({ result });
    } catch (e: any) {
      return res.status(500).json({
        errorMessage: e.message,
        error_object: e
      });
    }
  }
}