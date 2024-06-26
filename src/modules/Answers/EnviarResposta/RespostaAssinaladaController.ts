import { Request, Response } from "express";
import { RespostaAssinaladaUseCase } from "./RespostaAssinaladaUseCase";
import { CreateAnswersUseCase } from "../createAnswers/CreateIAnswersUseCase";
import { GetAnswersUseCase } from "../getAnswers/GetAnswersUseCase";

export class RespostaAssinaladaController {
  async handle(req: Request, res: Response) {
    try {
      const respostaAssinaladaUseCase = new RespostaAssinaladaUseCase();
      const createAnswersUseCase = new CreateAnswersUseCase();
      const getAnswersUseCase = new GetAnswersUseCase()

      const result = await respostaAssinaladaUseCase.execute(req.body.id_resposta, req.body.alternative);
      
      const answer_user = await getAnswersUseCase.execute(req.body.id_resposta)
      if (answer_user){
        const next_question = await createAnswersUseCase.execute(answer_user.user.phone)
        return res.json({ next_question });
      }
    } catch (e: any) {
      return res.status(500).json({
        errorMessage: e.message,
        error_object: e
      });
    }
  }
}