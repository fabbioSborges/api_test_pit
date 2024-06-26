import { prisma } from "../../../database/prismaClients";

export class ListQuestionUseCase {
  async execute() {
    const questions  = await prisma.questions.findMany({
      where: {
        
      }
    });
    return questions;
  }
}


