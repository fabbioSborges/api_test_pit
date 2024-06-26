import { prisma } from "../../../database/prismaClients";

export class ValidarUseUseCase {
  async execute(phone: string, cpf: string ) {
    const user  = await prisma.user.findUnique({
      where: {
        phone: phone,
        cpf: cpf
      }
    });

    if(!user){
      return {"is_valid": false, 
        "message": `Não é possivel validar o candidato: CPF ${cpf} não encontrado`}
    }

    if (user.final_test){
      return {"is_valid": false, 
        "message": `Usuario ${user.name} finalizou o teste no horario ${user.final_test} `}
    }

    const userEdit = await prisma.user.update({
      where: {
        phone: phone
      }, 
      data: {
        start_text: new Date()
      }
    })
    
    return {"is_valid": true, 
                    "message": `Usuario ${user.name} validado com sucesso`}
  }
}


