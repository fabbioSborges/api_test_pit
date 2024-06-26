
import { User } from "@prisma/client";
import IAnswers from "./IAnswers";

export default interface IUser {
  id: number;
  name: string;
  phone: string;
  email: string;
  Answers?: IAnswers[]
  cpf: string;
}
