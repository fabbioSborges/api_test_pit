import { prisma } from "../../../database/prismaClients";
import shuffleArray from "../../../utils/shuffleArray";
import { ListQuestionUseCase } from "../../Question/listQuestion/ListQuestionUseCase";
import { ListAnswersUserUseCase } from "../ListAnswersUser/ListAnswersUserUseCase";

export class CreateAnswersUseCase {
  async execute(phone: string) {
    const user = await prisma.user.findUnique({
      where:{
        phone
      }
    });
    if (!user){
      throw new Error("Usuário não encontrado");
    }
    const answers = await prisma.answers.findMany({
      where: {
        user: user
      }
    })

    const listQuestionUseCase = new ListQuestionUseCase()
    const listQuestion = await listQuestionUseCase.execute()

    if (answers.length == listQuestion.length){
      const listAnswersUserUseCase = new ListAnswersUserUseCase()
      const respostas = await listAnswersUserUseCase.execute(phone)
      const total_pontos = respostas.reduce((sum, resposta) => {
        if (resposta.alternative == resposta.correct){
          sum = sum +1 
         }
         return sum
        },0 )
        const user = await prisma.user.update({
          where:{
            phone
          },
          data:{
            total_pontos: total_pontos,
            final_test: new Date()
          }
        });

      return {message: "Teste finalizado, todas as questões foram respondidas!"}
    }


    const questionIds = answers.map((answer) => {
      return answer.questionId
    } )
    
    // Função para gerar um número aleatório entre as questões que ainda não foram respondidas
    const generateRandomNumber = () => {
      let randomNumber;
      do {
        randomNumber = Math.floor(Math.random() * listQuestion.length) + 1; // Gera número aleatório entre 0 e 12
      } while (questionIds.includes(randomNumber)); // Repete se o número gerado já estiver em questionIds
      return randomNumber;
    };

    const newRandomNumber = generateRandomNumber();

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

    return {
            "type": 'subjective',
            "id": answer.id,
            "Enunciado": question.text, 
            "Alternativa 1": alternativas[0], 
            "Alternativa 2": alternativas[1], 
            "Alternativa 3": alternativas[2], 
            "Alternativa 4": alternativas[3]}
  }
}