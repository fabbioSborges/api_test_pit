import { prisma } from "../../../database/prismaClients";
import shuffleArray from "../../../utils/shuffleArray";
import { ListQuestionUseCase } from "../../Question/listQuestion/ListQuestionUseCase";

export class IniciarTesteUseCase {
  async execute(phone: string) {
    const user = await prisma.user.findUnique({
      where:{
        phone
      }
    });
    if (!user){
      throw new Error("Usuário não encontrado");
    }
    if(user.start_text){
      return "Teste já iniciado";
    }

    const user_update = await prisma.user.update({
      where:{
        id: user.id
      },
      data: {
        start_text: new Date()
      }
    });

    const listQuestionUseCase = new ListQuestionUseCase()
    const listQuestion = await listQuestionUseCase.execute()

    const newRandomNumber = Math.floor(Math.random() * listQuestion.length) + 1; // Gera número aleatório entre 0 e 12
    
    const question = await prisma.questions.findUnique({
      where:{
        id: newRandomNumber
      }
    });

    if (!question){
      throw new Error(`Questão ${newRandomNumber} não encontrado`);
    }

    if(question.type == 'subjective'){
      const answer = await prisma.answers.create({
        data: {
          userId: user.id,
          questionId: question.id
        }
      })
      return {"id": answer.id,
        "Enunciado": question.text,
        "type": 'subjective',
      }
    }

    const alternativas_embaralhadas = shuffleArray([0,1,2,3])

    const correct = alternativas_embaralhadas.find(correta => {
      return correta == question.correct
    })

    const answer = await prisma.answers.create({
      data: {
        userId: user.id,
        questionId: question.id,
        correct: correct? correct+1:-1
      }
    })

    const alternativas = alternativas_embaralhadas.map(alternativa => {
      if (alternativa == 0)
        return question.alternative1
      if (alternativa == 1)
        return question.alternative2
      if (alternativa == 2)
        return question.alternative3
      if (alternativa == 3)
        return question.alternative4
    })


    return {"id": answer.id,
            "Enunciado": question.text, 
            "Alternativa 1": alternativas[0], 
            "Alternativa 2": alternativas[1], 
            "Alternativa 3": alternativas[2], 
            "Alternativa 4": alternativas[3],
            "type": 'objective',}
  }
}