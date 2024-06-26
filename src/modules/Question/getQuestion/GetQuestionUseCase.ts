import { prisma } from "../../../database/prismaClients";

export class GetQuestionUseCase {
  async execute(id: number) {
    const question  = await prisma.questions.findUnique({
      where: {
        id: id
      }, select: {
        text: true,
        alternative1: true,
        alternative2: true,
        alternative3: true,
        alternative4: true,

      }
    });
    return question;
  }
}


