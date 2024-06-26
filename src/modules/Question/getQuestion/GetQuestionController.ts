import { Request, Response } from "express";
import { GetQuestionUseCase } from "./GetQuestionUseCase";

export class GetQuestionController {
  async handle(req: Request, res: Response) {
    try {
      const getQuestionUseCase = new GetQuestionUseCase();
      const result = await getQuestionUseCase.execute(parseInt(req.params.id));
      return res.json({ result });
    } catch (e: any) {
      return res.status(500).json({
        errorMessage: e.message,
        error_object: e
      });
    }
  }
}