import { Request, Response } from "express";
import { ReceiveResponsesUseCase } from "./ReceiveResponsesUseCase";

export class ReceiveResponsesController {
  async handle(req: Request, res: Response) {
    try {
      const receiveResponsesUseCase = new ReceiveResponsesUseCase();

      const result = await receiveResponsesUseCase.execute(req.body.objectives, 
          req.body.subjective1, req.body.subjective2, 
            req.params.phone);     
      return res.json(result);
    } catch (e: any) {
      return res.status(500).json({
        errorMessage: e.message,
        error_object: e
      });
    }
  }
}