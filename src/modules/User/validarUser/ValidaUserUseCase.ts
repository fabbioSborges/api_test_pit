import { prisma } from "../../../database/prismaClients";

export class ValidarUseUseCase {
  async execute(phone: string, cpf: string ) {
    const user  = await prisma.user.findUnique({
      where: {
        phone: phone,
        cpf: cpf
      }
    });
    return (user)? {"is_valid": true, 
                    "message": `Usuario ${user.name} validado com sucesso`}
                    :
                    {"is_valid": false, 
                    "message": `Não é possivel validar o candidato: CPF ${cpf} não encontrado`}
                    ;
  }
}


