import { prisma } from "../../../database/prismaClients";
import { ListAnswersUserUseCase } from "../ListAnswersUser/ListAnswersUserUseCase";


export class ReceiveResponsesUseCase {
  async execute(objectives: string[], subjective1: string, subjective2: string, cpf: string){
    const minuto_max = 20;
    const user = await prisma.user.findMany(
      {
        where: {
          cpf
        }
      }
    )
    if (user.length == 0){
      return {sucess: false, message: `Usuário não encontrado`, is_finish: false} 
    }
    if (user[0].final_test){
      return {sucess: true, message: `Usuário já realizou o teste na data ${user[0].final_test}`, is_finish: true } 
    }
    if(!user[0].start_text){
      return {sucess: false, message: `Usuário ainda não validou o inicio do teste`, is_finish: false } 
    }

    const gabarito = await prisma.questions.findMany({
      where: {},
      select: {
        correct: true
      },
      orderBy:{
        id: "asc"
      }
    })

    objectives.forEach(async (alternative, index) => {
      const answers = await prisma.answers.findMany({
        where: {
          userId: user[0].id,
          questionId: index + 1,          
        }
      })

      if (answers.length > 0){
        const answer = await prisma.answers.update({
          where: {
            id: answers[0].id
          },
          data: {
            userId: user[0].id,
            questionId: index + 1,
            alternative: alternative,
            correct: gabarito[index].correct,
            
          }
        })
      }else{
        const answer = await prisma.answers.create({
          data: {
            userId: user[0].id,
            questionId: index + 1,
            alternative: alternative,
            correct: gabarito[index].correct,
            
          }
        })
      }
    })


    const listAnswersUserUseCase = new ListAnswersUserUseCase()
    const respostas = await listAnswersUserUseCase.execute(user[0].phone)
    const total_pontos = respostas.reduce((sum, resposta) => {
      if (resposta.alternative?.toLocaleLowerCase() === resposta.correct?.toLocaleLowerCase()){
        sum = sum +1 
       }
       return sum
      },0 )

    const subjetiva1 = await prisma.answers.findMany({
      where: {
        userId: user[0].id,
        questionId: 11,          
      }
    })
    if (subjetiva1.length > 0){
      const answer1 = await prisma.answers.update({
        where: {
          id: subjetiva1[0].id 
        },
        data: {
          userId: user[0].id,
          questionId: 11,
          alternative:subjective1 ,
          
        }
      })
    }else{
      const answer1 = await prisma.answers.create({
        data: {
          userId: user[0].id,
          questionId: 11,
          alternative:subjective1 ,
          
        }
      })
    }

    const subjetiva2 = await prisma.answers.findMany({
      where: {
        userId: user[0].id,
        questionId: 12,          
      }
    })
    if (subjetiva2.length > 0){
      const answer2 = await prisma.answers.update({
        where: {
          id: subjetiva2[0].id 
        },
        data: {
          userId: user[0].id,
          questionId: 12,
          alternative:subjective2 ,
          
        }
      })
    }else{
      const answer2 = await prisma.answers.create({
        data: {
          userId: user[0].id,
          questionId: 12,
          alternative:subjective2 ,
          
        }
      })
    }
    const final_test = new Date();
    
    const user_update = await prisma.user.update({
      where:{
        id: user[0].id
      },
      data:{
        total_pontos: total_pontos,
        final_test,
        situation: (final_test.getTime() - user[0].start_text.getTime()) / (1000 * 60) > minuto_max ? 'Desclassificado_time' : 'Classificado'
      }
    });

    if( (final_test.getTime() - user[0].start_text.getTime()) / (1000 * 60) > minuto_max){
      return {sucess: false, message: `Tempo de resposta foi maior que ${minuto_max} minutos`, is_finish: true}
    }
    
    return {sucess: true, message: "Respostas cadastradas!", is_finish: true} 

  }
}