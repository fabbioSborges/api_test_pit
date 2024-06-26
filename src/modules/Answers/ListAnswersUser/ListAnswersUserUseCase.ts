import { prisma } from "../../../database/prismaClients";
import IUser from "../../../models/IQuestions";

export class ListAnswersUserUseCase {
  async execute(phone: string) {
    const user = await prisma.user.findUnique({
      where: {
        phone: phone
      }
    })
    if (!user){
      throw new Error("Usuário não encontrado");
    }
    const answers  = await prisma.answers.findMany({
      where: {
        user
      }
  });
    return answers;
  }
}

