import { prisma } from "../../../database/prismaClients";
import IUser from "../../../models/IUser";

export class GetUserUseCase {
  async execute(phone: string) {
    const user  = await prisma.user.findUnique({
      where: {
        phone: phone
      }
    });
    return user;
  }
}


