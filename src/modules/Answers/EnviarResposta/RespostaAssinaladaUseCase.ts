import { prisma } from "../../../database/prismaClients";

export class RespostaAssinaladaUseCase {
  async execute(id: number, alternative: string) {
    const resposta = await prisma.answers.findUnique({
      where: {
        id
      }
    })
    if(resposta?.alternative === null){
      await prisma.answers.update({
        where: {
          id
        }, data: {
          alternative: alternative
        }
      })
    }
  }
}