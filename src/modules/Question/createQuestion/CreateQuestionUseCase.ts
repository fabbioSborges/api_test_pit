import { prisma } from "../../../database/prismaClients";
import IQuestions from "../../../models/IQuestions";

export class CreateQuestionUseCase {
  async execute(Questions: IQuestions) {
    const newQuestion = await prisma.questions.create({
      data: Questions as any,
    });

    return newQuestion;
  }
}