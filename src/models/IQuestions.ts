

export default interface IUser {
  id: number
  text: String
  type: 'objective' | 'subjective'
  alternative1: String
  alternative2: String
  alternative3: String
  alternative4: String
  correct: number
}
