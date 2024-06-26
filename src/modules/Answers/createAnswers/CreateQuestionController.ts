import { Request, Response } from "express";
import { CreateAnswersUseCase } from "./CreateIAnswersUseCase";

export class CreateQuestionController {
  async handle(req: Request, res: Response) {
    try {
      const createAnswersUseCase = new CreateAnswersUseCase();
      const result = await createAnswersUseCase.execute(req.body.phone);
      return res.json({ result });
    } catch (e: any) {
      return res.status(500).json({
        errorMessage: e.message,
        error_object: e
      });
    }
  }
}