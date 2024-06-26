import { Request, Response } from "express";
import { ListQuestionUseCase } from "./ListQuestionUseCase";

export class ListQuestionController {
  async handle(req: Request, res: Response) {
    try {
      const listQuestionUseCase = new ListQuestionUseCase();
      const result = await listQuestionUseCase.execute();
      return res.json({ result });
    } catch (e: any) {
      return res.status(500).json({
        errorMessage: e.message,
        error_object: e
      });
    }
  }
}