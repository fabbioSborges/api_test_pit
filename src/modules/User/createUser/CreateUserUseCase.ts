import { prisma } from "../../../database/prismaClients";
import IUser from "../../../models/IUser";

export class CreateUserUseCase {
  async execute(User: IUser) {
    const existingUser  = await prisma.user.findUnique({
      where: {
        email: User.email
      }
    });
    if(existingUser){
      throw new Error("Usuário já existe");
    }
    const newUser = await prisma.user.create({
      data: User as any,
    });

    return newUser;
  }
}