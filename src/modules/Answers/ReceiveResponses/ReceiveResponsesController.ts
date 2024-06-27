import { Request, Response } from "express";
import { ReceiveResponsesUseCase } from "./ReceiveResponsesUseCase";

export class ReceiveResponsesController {
  async handle(req: Request, res: Response) {
    try {
      const receiveResponsesUseCase = new ReceiveResponsesUseCase();
      const data = req.body;

      // Armazenando as perguntas em um vetor de strings
      const respostas = [
        data.pergunta_1,
        data.pergunta_2,
        data.pergunta_3,
        data.pergunta_4,
        data.pergunta_5,
        data.pergunta_6,
        data.pergunta_7,
        data.pergunta_8,
        data.pergunta_9,
        data.pergunta_10,
      ];
      const result = await receiveResponsesUseCase.execute(respostas, 
        data.pergunta_11, data.pergunta_12, req.params.cpf);     
      return res.json(result);
    } catch (e: any) {
      return res.status(500).json({
        errorMessage: e.message,
        error_object: e
      });
    }
  }
}