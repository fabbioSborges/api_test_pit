import { prisma } from "../../app";
import generateAuthToken from "../../utils/generateAuthToken";

export class Autenticacao_use_case{
  async execute(email:string){
    const user = await prisma.user.findUnique({
      where: {email:email}
    })

    if (!user){
      return "Usuario não exise"
    }

    // if (user.password == password){
      return generateAuthToken({id: user.id, name: user.name })
    // }else{
    //   return 'Senha invalida'
    // }
  }
}