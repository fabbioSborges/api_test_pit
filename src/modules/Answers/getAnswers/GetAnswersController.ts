import { Request, Response } from "express";
import { GetAnswersUseCase } from "./GetAnswersUseCase";

export class GetAnswersController {
  async handle(req: Request, res: Response) {
    try {
      const getAnswersUseCase = new GetAnswersUseCase();
      const result = await getAnswersUseCase.execute(parseInt(req.params.id));
      return res.json({ result });
    } catch (e: any) {
      return res.status(500).json({
        errorMessage: e.message,
        error_object: e
      });
    }
  }
}