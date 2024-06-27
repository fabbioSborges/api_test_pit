import { prisma } from "../../../database/prismaClients";
import { ListAnswersUserUseCase } from "../ListAnswersUser/ListAnswersUserUseCase";


export class ReceiveResponsesUseCase {
  async execute(objectives: string[], subjective1: string, subjective2: string, cpf: string){
    const user = await prisma.user.findMany(
      {
        where: {
          cpf
        }
      }
    )
    if (user.length == 0){
      return {sucess: false, message: `Usuário não encontrado`} 
    }
    if (user[0].final_test){
      return {sucess: false, message: `Usuário já realizou o teste na data ${user[0].final_test}`} 
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
          userId: user[0].id,
          questionId: index + 1,
          alternative: alternative,
          correct: gabarito[index].correct,
          
        }
      })
    })


    const listAnswersUserUseCase = new ListAnswersUserUseCase()
    const respostas = await listAnswersUserUseCase.execute(user[0].phone)
    const total_pontos = respostas.reduce((sum, resposta) => {
      if (resposta.alternative == resposta.correct){
        sum = sum +1 
       }
       return sum
      },0 )
      const user_update = await prisma.user.update({
        where:{
          id: user[0].id
        },
        data:{
          total_pontos: total_pontos,
          final_test: new Date()
        }
      });

      const answer1 = await prisma.answers.create({
        data: {
          userId: user[0].id,
          questionId: 11,
          correct:subjective1 ,
          
        }
      })

      const answer2 = await prisma.answers.create({
        data: {
          userId: user[0].id,
          questionId: 12,
          correct:subjective2 ,
          
        }
      })

      return {sucess: true, message: "Respostas cadastradas!"} 

  }
}