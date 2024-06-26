import { prisma } from "../../../database/prismaClients";

export class ValidarUseUseCase {
  async execute( cpf: string ) {
    const user  = await prisma.user.findMany({
      where: {
        cpf: cpf
      }
    });
    console.log(user)
    if(user.length == 0){
      return {"is_valid": false, 
        "message": `Não é possivel validar o candidato: CPF ${cpf} não encontrado`}
    }

    if (user[0].final_test){
      return {"is_valid": false, 
        "message": `Usuario ${user[0].name} finalizou o teste no horario ${user[0].final_test} `}
    }

    const userEdit = await prisma.user.update({
      where: {
        phone: user[0].phone
      }, 
      data: {
        start_text: new Date()
      }
    })

    return {"is_valid": true, 
                    "message": `Usuario ${user[0].name} validado com sucesso`}
  }
}


