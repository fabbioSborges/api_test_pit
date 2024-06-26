import { prisma } from "../../../database/prismaClients";
import { ListAnswersUserUseCase } from "../ListAnswersUser/ListAnswersUserUseCase";


export class ReceiveResponsesUseCase {
  async execute(objectives: number[], subjective1: number, subjective2: number, phone: string){
    const user = await prisma.user.findUnique(
      {
        where: {
          phone
        }
      }
    )
    if (!user){
      throw new Error("Usuário não encontrado");
    }

    const gabarito = await prisma.questions.findMany({
      where: {},
      select: {
        correct: true
      }
    })

    objectives.forEach(async (alternative, index) => {
      const answer = await prisma.answers.create({
        data: {
          userId: user.id,
          questionId: index,
          alternative: alternative,
          correct: gabarito[index].correct,
          
        }
      })
    })

    const listAnswersUserUseCase = new ListAnswersUserUseCase()
    const respostas = await listAnswersUserUseCase.execute(phone)
    const total_pontos = respostas.reduce((sum, resposta) => {
      if (resposta.alternative == resposta.correct){
        sum = sum +1 
       }
       return sum
      },0 )
      const user_update = await prisma.user.update({
        where:{
          phone
        },
        data:{
          total_pontos: total_pontos,
          final_test: new Date()
        }
      });

      return {message: "Respostas cadastradas,!"} 

  }
}