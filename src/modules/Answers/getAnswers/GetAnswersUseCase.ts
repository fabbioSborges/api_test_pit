import { prisma } from "../../../database/prismaClients";
import IUser from "../../../models/IQuestions";

export class GetAnswersUseCase {
  async execute(id: number) {
    const answers  = await prisma.answers.findUnique({
      where: {
        id
      }, include: {
        user: {
          select:
          {
            phone: true
          }
        }
      }
  });
    return answers;
  }
}

