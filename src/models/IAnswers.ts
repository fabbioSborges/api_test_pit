
import IQuestions from "./IQuestions";
import IUser from "./IUser";

export default interface IAnswers {
  id: number
  start_time:  Date
  finish_time?: Date
  user:        IUser
  question: IQuestions
  correct: number
  alternative?: number
}
